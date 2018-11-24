import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions}  from '@angular/http';
import {Observable}               from 'rxjs';

@Injectable()
export class ApplyNowService {
  constructor (private http: Http) {}
  url = "/service/sendApplynow";

  addApplyNowDetails(formData: FormData): Observable<any> {
      let headers = new Headers({});
      let options = new RequestOptions({headers : headers});
      return this.http.post(this.url, formData, options)
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
