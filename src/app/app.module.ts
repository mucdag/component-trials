import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiLineTrialComponent } from './multi-line-trial/multi-line-trial.component';
import { MuMultiLineChartModule } from './shared/components/mu-multi-line-chart/mu-multi-line-chart.module';
import { HttpRequestOAuthHeaderInterceptor } from './shared/http-interceptors/http-request-oauth-header-interceptor';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MuMultiLineChartModule
  ],
  declarations: [
    AppComponent,
    MultiLineTrialComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestOAuthHeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
