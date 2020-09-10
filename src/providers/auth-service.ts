import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { FeedBack } from '../models/feedback';

@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  // Start for Success Class //
  public addStudent(sFirstname:string,
                    sLastname:string,
                    sAddress:string,
                    sDob:string,
                    sDegree:string,
                    school:number,
                    department:number,
                    pFirstname:string,
                    pLastname:string,
                    pAddress:string,
                    pDob:string):Observable<FeedBack> {
    
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    let data = {
      'sFirstname': sFirstname,
      'sLastname': sLastname,
      'sAddress': sAddress,
      'sDob': sDob,
      'sDegree': sDegree,
      'school': school,
      'department': department,
      'pFirstname': pFirstname,
      'pLastname': pLastname,
      'pAddress': pAddress,
      'pDob': pDob
    }
    return this.http.post('http://ionic.dev/student/add', data, { headers: myHeader })
    .map((res: Response) => {
      let data = res.json();
      return data;
    }).catch(this.handleError);
  }

   public updateStudent(firstname:string,
                    lastname:string,
                    address:string,
                    student_id:number): Observable<FeedBack>{
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    let data = {
      'student_id': student_id,
      'firstname': firstname,
      'lastname': lastname,
      'address': address
    }
    return this.http.post('http://ionic.dev/student/update', data, { headers: myHeader })
    .map((res: Response) => {
      let data = res.json();
      return data;
      }).catch(this.handleError);
  }

  // End Class //

  // Start for TEST Class //
  public removeStudent(student_id:number): Observable<FeedBack>{
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    let data = {
      'student_id': student_id
    }
    return this.http.post('http://ionic.dev/student/remove', data, { headers: myHeader })
    .map((res: Response) => {
      let data = res.json();
      return data;
      }).catch(this.handleError);
  }

   private handleError(error: any) {
     return Observable.throw(error.json().errorMessage || 'Server เกิดข้อผิดพลาด');
   }

}
