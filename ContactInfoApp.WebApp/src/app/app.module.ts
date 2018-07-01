import { AppRouteModule } from './app-route.module';
import { NotificationService } from './_services/notification.service';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactService } from './_services/contact.service';
import { AuthGuard } from './_guards';
import { CustomErrorHandler } from './_error-handlers';
import { HeaderInterceptor } from './_Interceptors/HeaderInterceptor';
import { TableService } from './_services/table.service';
import { LoaderService } from './_services/loader.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouteModule,
    NgbModule.forRoot()
  ],
  declarations: [AppComponent, PageNotFoundComponent],
  providers: [
    AuthGuard,
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    ContactService,
    TableService,
    NotificationService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
