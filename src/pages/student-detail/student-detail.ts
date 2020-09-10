import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StudentService } from '../../providers/student-service';
import { StudentItem } from '../../models/student-item';
import { Subscription } from 'rxjs/Subscription'
import { StudentEditPage } from '../student-edit/student-edit';
import { ParentDetailPage } from '../parent-detail/parent-detail';

@Component({
  selector: 'page-student-detail',
  templateUrl: 'student-detail.html'
})
export class StudentDetailPage {
  student_id:number;
  sFirstname:string;
  sLastname:string;
  school:string;
  studentitems: StudentItem[];
  sub: Subscription;
  errorMessage:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private studentService:StudentService) {
    this.student_id = this.navParams.get('student_id'); // Get data from student.ts
    this.sFirstname = this.navParams.get('firstname');
    this.sLastname = this.navParams.get('lastname');
    /*this.school = this.navParams.get('school_id');
    if(this.school == '1'){
      this.school = 'บัญชี';
    } else if(this.school == '2'){
      this.school = 'บริหารธุรกิจ';
    } else if(this.school == '3'){
      this.school = 'นิเทศศาสตร์';
    } else if(this.school == '4'){
      this.school = 'นิติศาสตร์';
    } else if(this.school == '5'){
      this.school = 'มนุษยศาสตร์และการจัดการการท่องเที่ยว';
    } else if(this.school == '6'){
      this.school = 'เศรษฐศาสตร์';
    } else if(this.school == '7'){
      this.school = 'วิทยาศาสตร์และเทคโนโลยี';
    } else if(this.school == '8'){
      this.school = 'ศิลปกรรมศาสตร์';
    } else if(this.school == '9'){
      this.school = 'วิศวกรรมศาสตร์';
    } else if(this.school == '10'){
      this.school = 'สถาปัตยกรรมศาสตร์';
    } else if(this.school == '11'){
      this.school = 'การสร้างเจ้าของธุรกิจและการบริหารกิจการ';
    } else if(this.school == '12'){
      this.school = 'ดิจิทัลมีเดียและศิลปะภาพยนตร์';
    }*/
  }

  ionViewWillEnter() {
      this.getStudentDetail();
  }

  ionViewWillLeave() {
      this.sub.unsubscribe();
  }

  private getStudentDetail(){
    this.sub = this.studentService.getStudentDetail(this.student_id).subscribe(
      (res) => this.studentitems = res,
      (error) => this.errorMessage = <any> error
    );
  }

  private itemSelected(s):void {
    this.navCtrl.push(StudentEditPage,{
      student_id : s.student_id, //Send data to student-edit.ts
      firstname : s.firstname,
      lastname : s.lastname,
      school : this.school,
    });
  }

  private parentSelected(s):void {
    console.log("Parent Selected : "+s)
    this.navCtrl.push(ParentDetailPage,{
      parent_id : s, //Send data to parent-detail.ts
    });
  }

}
