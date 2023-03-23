import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ApiService} from '../../api.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {OneInputComponent} from '../../components/one-input/one-input.component';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  users: Array<any> = [];
  expandSet = new Set<string>();

  preAuthKeys: { [key: string]: any } = {}

  constructor(private api: ApiService, private modal: NzModalService,
              private viewContainerRef: ViewContainerRef, private msg: NzMessageService) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.api.userList().subscribe(x => {
      this.users = x.users.sort(this.compare('id', true));
    });
  }

  getPreAuthKeys(user: string) {
    this.api.preAuthKeyList(user).subscribe(x => {
      this.preAuthKeys[user] = x.preAuthKeys;
      console.log(x.preAuthKeys)
    })
  }

  compare(property: string, asc: boolean) {
    return function (value1: { [x: string]: any; }, value2: { [x: string]: any; }) {
      let a = value1[property]
      let b = value2[property]
      // 默认升序
      if (asc == undefined) {
        return a - b
      } else {
        return asc ? a - b : b - a
      }
    }
  }

  onExpandChange(name: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(name);
      this.getPreAuthKeys(name);
    } else {
      this.expandSet.delete(name);
    }
  }

  newUser() {
    this.modal.create({
      nzTitle: 'New User',
      nzContent: OneInputComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null
    }).afterClose.subscribe(x => {
      if (x) {
        this.api.userAdd(x).subscribe(x => {
          this.msg.success('User add success');
          this.getList();
        })
      }
    })
  }

  renameUser(name: string) {
    this.modal.create({
      nzTitle: `Rename User - ${name}`,
      nzComponentParams: {notice: name},
      nzContent: OneInputComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null
    }).afterClose.subscribe(x => {
      if (x) {
        this.api.userRename(name, x).subscribe(x => {
          this.msg.success('User Rename success');
          this.getList();
        })
      }
    })
  }

  deleteUser(name: string) {
    this.modal.warning({
      nzTitle: 'Delete Confirm',
      nzContent: `will delete user 【 ${name} 】 ,Are you sure？`,
      nzOkDanger: true,
      nzOkText: 'Delete',
      nzCancelText: 'cancel',
      nzOnOk: () => {
        this.api.userDelete(name).subscribe(_ => {
          this.msg.success('User delete success');
          this.getList();
        })
      }
    });
  }

  createPreAuthKey(name: string) {
    this.api.preAuthKeyAdd(name, '9999-03-23T13:41:44.928Z').subscribe(_ => {
      this.msg.success('Create PreAuthKey success')
      this.getPreAuthKeys(name);
    })
  }

  expirePreAuthKey(key: any) {
    this.modal.warning({
      nzTitle: 'Expire Confirm',
      nzContent: `will expire PreAuthKey 【 ${key.key} 】 ,Are you sure？`,
      nzOkDanger: true,
      nzOkText: 'Expire It',
      nzCancelText: 'cancel',
      nzOnOk: () => {
        this.api.preAuthKeyExpire(key.user, key.key).subscribe(_ => {
          this.msg.success('Expire PreAuthKey success');
          this.getPreAuthKeys(key.user);
        })
      }
    });
  }
}
