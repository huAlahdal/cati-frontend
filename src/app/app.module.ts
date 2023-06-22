import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastaModule} from 'ngx-toasta';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SearchPipe } from './pipes/search.pipe';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './services/app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToggleBarService } from './services/toggleBar.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { baseUrl } from './helpers/baseUrl';
import { ErrorInterceptorProvider } from './services/error-interceptor.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

export function tokenGetter() {
   const userDataAgent: {name: string; email: string; mobile: string; roleId: number; token: string; } = JSON.parse(localStorage.getItem('userDataAgent') || '{}');
   return userDataAgent.token;
 }

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      LoginComponent,
      SearchPipe,
      ProjectsListComponent
   ],
   imports: [
      BrowserModule,
      ModalModule.forRoot(),
      ProgressbarModule.forRoot(),
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      NgxDatatableModule,
      ButtonsModule,
      HttpClientModule,
      NgxSpinnerModule,
      BrowserAnimationsModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      AlertModule.forRoot(),
      ToastaModule.forRoot(),
      JwtModule.forRoot({
         config: {
           tokenGetter,
           whitelistedDomains: [baseUrl.substr(8)],
           blacklistedRoutes: [baseUrl.substr(8) + '/api/users/'],
         },
       }),
      NgxNavbarModule,
      NgxPaginationModule,
      BsDatepickerModule.forRoot(),
   ],
   providers: [
      ToggleBarService,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
