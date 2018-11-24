import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions}  from '@angular/http';
import {Observable}               from 'rxjs';

@Injectable()
export class ContactUsService {
  constructor (private http: Http) {}
  url = "/service/sendContactUsEmail";

  addContactUsDetails(value: Object): Observable<any> {

    const body = JSON.stringify(value);
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    let options = new RequestOptions({headers : headers});
    return this.http.post(this.url, body, options)
    .map(this.extractData)
    .catch(this.handleErrorObservable);

  }

  private extractData(res: Response){
    return res;
  }

  private handleErrorObservable(error: Response | any){
    return Observable.throw(error);
  }


}
