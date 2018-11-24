import {Injectable}               from '@angular/core';
import {Http, Response}           from '@angular/http';
import {Headers, RequestOptions}  from '@angular/http';
import {Observable}               from 'rxjs/Observable';

@Injectable()
export class EmailSend {
  constructor (private http: Http) {}

  sendEmail(value: Object): Observable<any> {
    const body = JSON.stringify(value);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('', body, {
      headers : headers
    }).map(res => res.json());
  }
}
