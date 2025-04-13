import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  serverUrl = '/';
  apiKeys = '';
  changeServerUrl = '';
  hsVersion = '';

  changeServerShow = false;

  constructor(private api: ApiService, private router: Router, private msg: NzMessageService) {
  }

  ngOnInit() {
    this.serverUrl = localStorage.getItem('serverUrl') ?? '/';
    let apikey = localStorage.getItem('serverKey') ?? '';
    if (apikey) {
      this.checkLogin();
    }
  }

  handleCancel() {
    this.changeServerShow = false;
  }

  doLogin() {
    localStorage.setItem('serverKey', this.apiKeys);
    this.checkLogin();
  }

  checkLogin() {
    this.api.userList().subscribe(x => {
      this.router.navigateByUrl('');
    }, error => {
      this.msg.error(error.error + 'teste');
    });
  }

  handleOk() {
    if (!this.changeServerUrl) {
      this.serverUrl = '';
    } else {
      this.serverUrl = this.changeServerUrl;
    }
    
    if(!this.hsVersion){
      this.hsVersion = 'v0.23';
    } else {
      this.hsVersion = this.hsVersion
    }

    localStorage.setItem('serverUrl', this.serverUrl);
    localStorage.setItem('hsVersion', this.hsVersion);
    this.changeServerShow = false;
  }

  showChangeServer() {

    this.changeServerUrl = localStorage.getItem('serverUrl') ?? '';
    this.changeServerShow = true;
  }

}
