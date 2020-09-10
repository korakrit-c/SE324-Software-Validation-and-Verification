import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { School } from '../models/school';
import { SchoolItem } from '../models/school-item';

@Injectable()
export class SchoolService {

  constructor(public http: Http) {
    console.log('Hello SchoolService Provider');
  }

  getSchool():Observable<School[]> {
    return this.http.get('http://ionic.dev/school/list')
    .map((res:Response) => <School[]> res.json())
    .catch(this.handleError);
  }

  private handleError(error:any) {
    return Observable.throw(error.json().errorMessage || 'เกิดข้อผิดพลาดจาก Server');
  }


}
