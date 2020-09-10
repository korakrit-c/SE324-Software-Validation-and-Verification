import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StudentService } from '../../providers/student-service'; 
import { Student } from '../../models/student'; 
import { StudentDetailPage } from '../student-detail/student-detail';

import { Subscription } from 'rxjs/Subscription'; 

@Component({
  selector: 'page-student',
  templateUrl: 'student.html'
})
export class StudentPage {
  students: Student[];
  sub:Subscription;
  errorMessage:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private studentService:StudentService) {}

  private getStudents() {    
    this.sub = this.studentService.getStudent().subscribe( 
      (res) => this.students = res,
      (error) => this.errorMessage = <any> error
    );
  }

  ionViewWillEnter() {
      this.getStudents();
  }

  ionViewWillLeave() {
      this.sub.unsubscribe();
  }

  private itemSelected(s):void {
    this.navCtrl.push(StudentDetailPage,{
      student_id : s.student_id, //Send data to student-detail.ts
      firstname : s.firstname,
      lastname : s.lastname,
      school_id : s.school_id
    });
  }
  
  private getStudentItems(ev: any) {
    let val = ev.target.value; // set val to the value of the searchbar
    if (val && val.trim() != '') { // if the value is an empty
      this.students = this.students.filter((student:Student) => {
        return (student.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        student.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        student.student_id.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.getStudents();
    }
  }

}