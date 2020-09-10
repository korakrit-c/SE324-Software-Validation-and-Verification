import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Department } from '../models/department';
import { DepartmentItem } from '../models/department-item';

@Injectable()
export class DepartmentService {

  constructor(public http: Http) {
    console.log('Hello DepartmentService Provider');
  }

  getDepartments():Observable<Department[]> {
    return this.http.get('http://ionic.dev/department/list')
    .map((res:Response) => <Department[]> res.json())
    .catch(this.handleError);
  }

  getDepartment(scool_id:number):Observable<Department[]> {
    return this.http.get('http://ionic.dev/department/id/'+scool_id)
    .map((res:Response) => <Department[]> res.json())
    .catch(this.handleError);
  }


  private handleError(error:any) {
    return Observable.throw(error.json().errorMessage || 'เกิดข้อผิดพลาดจาก Server');
  }

}
