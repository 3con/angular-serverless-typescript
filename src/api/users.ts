import * as request from 'request-promise-lite';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import { IUser, User } from '../user.model';

export function route(event, context, callback): void {
  getUsers().subscribe(users => {
    callback(null, {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(users)
    });
  });
};

export function getUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  return Observable
    .fromPromise(request.get(url, { json: true }))
    .map(users => users as any[])
    .map(users => users.map(user => new User(user)))
    .map(users => users.map(user => {
      user.name = 'Mr. ' + user.name;
      return user;
    }))
    .catch(error => Observable.of([]));
}
