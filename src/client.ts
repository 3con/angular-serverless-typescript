import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';

import { IUser } from './user.model';

@Component({
  selector: 'app',
  template: `
    <h1>Serverless & TypeScript</h1>
    <ul>
      <li *ngFor="let user of users">{{user.name}}</li>
    </ul>
  `
})
class AppComponent {
  users: IUser[] = [];

  constructor(private http: Http) {
    const url = 'https://jsonplaceholder.typicode.com/users';
    //const url = '/api/users';
    //const url = 'https://2ua0gtw2zc.execute-api.eu-west-1.amazonaws.com/dev/users';
    this.http.get(url)
      .map(response => response.json() as IUser[])
      .subscribe(users => this.users = users, error => this.users = []);
  }
}

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {}

import './styles.css';

platformBrowserDynamic().bootstrapModule(AppModule);
