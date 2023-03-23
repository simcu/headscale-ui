import {Component, Input} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-one-input',
  templateUrl: './one-input.component.html',
  styleUrls: ['./one-input.component.css']
})
export class OneInputComponent {
  text = ''

  @Input() notice = ''

  constructor(private modal: NzModalRef, private msg:NzMessageService) {
  }

  cancel() {
    this.modal.destroy(null);
  }

  ok() {
    if(!this.text){
      this.msg.error("Input can't be null.")
      return;
    }
    this.modal.destroy(this.text);
  }
}
