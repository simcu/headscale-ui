import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {UserManagerComponent} from './views/user-manager/user-manager.component';
import {MachineManagerComponent} from './views/machine-manager/machine-manager.component';
import {LayoutComponent} from './views/layout/layout.component';
import {LoginComponent} from './views/login/login.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzTableModule} from 'ng-zorro-antd/table';
import {HttpApiInterceptor} from './http-api.interceptor';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import { OneInputComponent } from './components/one-input/one-input.component';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzSelectModule} from 'ng-zorro-antd/select';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    UserManagerComponent,
    MachineManagerComponent,
    LayoutComponent,
    LoginComponent,
    OneInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzMessageModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzDescriptionsModule,
    NzTableModule,
    NzDividerModule,
    NzTagModule,
    NzDropDownModule,
    NzGridModule,
    NzListModule,
    NzSelectModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
