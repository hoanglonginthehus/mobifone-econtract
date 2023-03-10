import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';
import { OrganizationComponent } from './organization/organization.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ServiceComponent } from './service/service.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { AuthInterceptorProvider } from './auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NavSideBarComponent,
    OrganizationComponent,
    HomeComponent,
    UserComponent,
    ServiceComponent,
    MainComponent,
    OrganizationDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
