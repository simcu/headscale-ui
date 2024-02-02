import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApiService} from '../../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OneInputComponent} from '../../components/one-input/one-input.component';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-machine-manager',
  templateUrl: './machine-manager.component.html',
  styleUrls: ['./machine-manager.component.css']
})
export class MachineManagerComponent implements OnInit {
  expandSet = new Set<string>();

  machines: Array<any> = [];
  user = '';
  users: Array<any> = [];

  changeOwnerMachine: any = {};
  tagEditMachine: any = {}
  changeOwnerUser: string = '';

  tags = ['Unremovable', 'Tag 2', 'Tag 3'];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

  constructor(private api: ApiService, private route: ActivatedRoute, private msg: NzMessageService,
              private modal: NzModalService, private viewContainerRef: ViewContainerRef,
              private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
    this.route.queryParams.subscribe(x => {
      if (x['user']) {
        this.user = x['user'];
      } else {
        this.user = ''
      }
      this.getList();
    })
  }

  getUsers() {
    this.api.userList().subscribe(x => {
      this.users = x.users;
    });
  }

  getList() {
    this.api.machineList(this.user).subscribe(x => {
      this.machines = x.nodes.sort((a: any, b: any) => parseInt(a.id) - parseInt(b.id));
      this.getRoutes();
      if (this.tagEditMachine.id) {
        this.tagEditMachine = this.machines.find(x => x.id == this.tagEditMachine.id);
      }
    })
  }

  getRoutes() {
    this.api.routeList().subscribe(x => {
      for (let r of x.routes) {
        let m = this.machines.find(x => x.id === r.machine.id);
        if (m) {
          if (['0.0.0.0/0', '::/0'].indexOf(r.prefix) !== -1) {
            if (m['exitNodes']) {
              m['exitNodes'].push(r);
            } else {
              m['exitNodes'] = [r]
            }
          } else {
            if (m['subnets']) {
              m['subnets'].push(r);
            } else {
              m['subnets'] = [r]
            }
          }
        }
      }
      for (let m of this.machines) {
        if (m.subnets) {
          m['subnets_enabled_num'] = m.subnets.filter((sn: { enabled: any; }) => sn.enabled).length;
        }
        if (m.exitNodes) {
          m['exitNode_enabled_num'] = m.exitNodes.filter((sn: { enabled: any; }) => sn.enabled).length;
        }
      }
    })
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  renameMachine(machine: any) {
    this.modal.create({
      nzTitle: `Rename User - ${machine.givenName}`,
      nzComponentParams: {notice: machine.givenName},
      nzContent: OneInputComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null
    }).afterClose.subscribe(x => {
      if (x) {
        this.api.machineRename(machine.id, x).subscribe(x => {
          this.msg.success('Machine Rename success');
          this.getList();
        })
      }
    })
  }

  deleteMachine(machine: any) {
    this.modal.warning({
      nzTitle: 'Delete Confirm',
      nzContent: `will delete machine 【 ${machine.givenName} 】 ,Are you sure？`,
      nzOkDanger: true,
      nzOkText: 'Delete',
      nzCancelText: 'cancel',
      nzOnOk: () => {
        this.api.machineDelete(machine.id).subscribe(_ => {
          this.msg.success('Machine delete success');
          this.getList();
        })
      }
    });
  }

  enableRoute(id: string) {
    this.api.routeEnable(id).subscribe(x => {
      this.msg.success('Route Enable success');
      this.getList();
    })
  }

  disableRoute(id: string) {
    this.api.routeDisable(id).subscribe(x => {
      this.msg.success('Route Disable success');
      this.getList();
    })
  }

  userChange(e: any) {
    if (e) {
      this.router.navigateByUrl(`/machine?user=${e}`)
    } else {
      this.router.navigateByUrl('/machine')
    }
  }

  registerMachine() {
    if (!this.user) {
      this.msg.error('Please select user first!')
      return;
    }
    this.modal.create({
      nzTitle: `Register Machine For User: ${this.user}`,
      nzContent: OneInputComponent,
      nzComponentParams: {notice: 'nodekey:xxxxxxxxxxxxxxxxxxxxxx'},
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null
    }).afterClose.subscribe(x => {
      if (x) {
        this.api.machineRegister(this.user, 'nodekey:' + x.replace('nodekey:', '')).subscribe(x => {
          this.msg.success('Register machine success');
          this.getList();
        })
      }
    })
  }

  changeOwner(m: any) {
    this.changeOwnerMachine = m;
  }

  doChangeOwner() {
    if (!this.changeOwnerUser) {
      this.msg.error('Must select one user')
      return;
    }
    this.api.machineChangeUser(this.changeOwnerMachine.id, this.changeOwnerUser).subscribe(_ => {
      this.msg.success('Machine change owner success')
      this.getList();
      this.changeOwnerMachine = {}
    })
  }

  handleClose(removedTag: {}): void {
    this.tagEditMachine.forcedTags = this.tagEditMachine.forcedTags.filter((tag: {}) => tag !== removedTag);
    this.updateTags(this.tagEditMachine.forcedTags);
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tagEditMachine.forcedTags.indexOf(this.inputValue) === -1) {
      this.tagEditMachine.forcedTags = [...this.tagEditMachine.forcedTags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
    this.updateTags(this.tagEditMachine.forcedTags);
  }

  updateTags(tags: Array<string>) {
    this.api.machineTag(this.tagEditMachine.id, tags).subscribe(_ => {
    }, _ => {
    }, () => {
      this.getList();
    })
  }
}
