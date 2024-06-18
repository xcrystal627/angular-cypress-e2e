import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ToastrModule } from 'ngx-toastr';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HiwComponent } from './hiw/hiw.component';
import { HomeComponent } from './home/home.component';
import { ListItemComponent } from './list-item/list-item.component';
import { LoginComponent } from './login/login.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { ExamsPipe } from "./pipes/exams.pipe";
import { IsLoggedDirective } from './providers/is-logged.directive';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { FullTextPopupComponent } from './dashboard/fulltext/fulltext.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    HiwComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    IsLoggedDirective,
    ListItemComponent,
    DashboardComponent,
    FullTextPopupComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    DpDatePickerModule,
    ExamsPipe,
    EllipsisPipe,
    ClickOutsideDirective
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
