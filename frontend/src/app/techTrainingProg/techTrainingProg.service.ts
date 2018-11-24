import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions, ResponseContentType}  from '@angular/http';
import {Observable}               from 'rxjs';

@Injectable()
export class TechTrainingProgService {
  constructor (private http: Http) {}
  url = "/assets/documents/MB_DRIVE_One_Page_Brochure.pdf";

  getBrochurePDF(): Observable<any> {
    return this.http.get(this.url,{responseType: ResponseContentType.Blob })
    .map(this.extractData)
    .catch(this.handleErrorObservable);

  }

  private extractData(response: Response){
    return response;
  }

  private handleErrorObservable(error: Response | any){
    return Observable.throw(error);
  }


}
