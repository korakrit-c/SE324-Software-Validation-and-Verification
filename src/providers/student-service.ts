import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Student } from '../models/student';
import { Parent } from '../models/parent';
import { StudentItem } from '../models/student-item';

@Injectable()
export class StudentService {

  constructor(public http: Http) {
    console.log('Hello StudentService Provider');
  }

  getStudent():Observable<Student[]> {
    return this.http.get('http://ionic.dev/student/list')
    .map((res:Response) => <Student[]> res.json())
    .catch(this.handleError);
  }

  getStudentDetail(student_id:number):Observable<StudentItem[]> {
    return this.http.get('http://ionic.dev/student/id/'+student_id)
    .map((res:Response) => <StudentItem[]> res.json())
    .catch(this.handleError);
  }

  getParentDetail(parent_id:number):Observable<Parent[]> {
    return this.http.get('http://ionic.dev/parent/id/'+parent_id)
    .map((res:Response) => <Parent[]> res.json())
    .catch(this.handleError);
  }

  private handleError(error:any) {
    return Observable.throw(error.json().errorMessage || 'เกิดข้อผิดพลาดจาก Server');
  }

}
