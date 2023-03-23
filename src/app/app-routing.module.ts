import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './views/layout/layout.component';
import {UserManagerComponent} from './views/user-manager/user-manager.component';
import {MachineManagerComponent} from './views/machine-manager/machine-manager.component';
import {LoginComponent} from './views/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/machine'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'user', component: UserManagerComponent},
      {path: 'machine', component: MachineManagerComponent},
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
