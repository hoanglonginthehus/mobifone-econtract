import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { OrganizationComponent } from './organization/organization.component';
import { ServiceComponent } from './service/service.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: 'main', component: MainComponent,
    children: [
      {
        path: 'organization', component: OrganizationComponent,
      },
      {
        path: 'home', component: HomeComponent,
      },
      {
        path: 'user', component: UserComponent,
      },
      {
        path: 'service', component: ServiceComponent,
      },
    ],
    canActivate:[IsAuthenticatedGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
