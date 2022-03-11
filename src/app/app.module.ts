import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Amplify } from 'aws-amplify';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Configure amplify to cognito login
Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_9YxkQMGKI',
    userPoolWebClientId: '3ol8c0brftf7o6ovj6eoag86g7',
    authenticathionFlowType: 'USER_PASSWORD_AUTH'
  }
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
