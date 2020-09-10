import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'; 

import { FeedBack } from '../../models/feedback';
import { StudentItem } from '../../models/student-item';
import { AuthService } from '../../providers/auth-service';
import { StudentService } from '../../providers/student-service'; 
import { StudentDetailPage } from '../student-detail/student-detail';

@Component({
  selector: 'page-student-edit',
  templateUrl: 'student-edit.html'
})
export class StudentEditPage {
  myForm: FormGroup;
  studentitems: StudentItem[];
  student_id:number;
  sFirstname:string;
  sLastname:string;
  firstname:FormControl;
  lastname:FormControl;
  address:FormControl;
  degree:FormControl;
  sub:Subscription;
  data:FeedBack;
  errorMessage:string;

  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            private studentService:StudentService,
            private fb: FormBuilder,
            private authService:AuthService,
            private loadingCtrl: LoadingController,
            private alertCtrl: AlertController) {

              this.firstname = fb.control('',Validators.required);
              this.lastname = fb.control('',Validators.required);
              this.address = fb.control('',Validators.required);
              //this.degree = fb.control('', Validators.compose([Validators.required, Validators.maxLength(1)]));
              this.myForm = fb.group({
                'firstname': this.firstname,
                'lastname': this.lastname,
                'address': this.address
              })
              
              this.student_id = this.navParams.get('student_id'); // Get data from student.ts
              this.sFirstname = this.navParams.get('firstname');
              this.sLastname = this.navParams.get('lastname');
            }

  private getStudentDetail(){
    this.sub = this.studentService.getStudentDetail(this.student_id).subscribe(
      (res) => this.studentitems = res,
      (error) => this.errorMessage = <any> error
    );
  }

  private updateStudent():void {
    // Get data from form
    let student_id = this.student_id;
    let firstname = this.myForm.controls['firstname'].value;
    let lastname = this.myForm.controls['lastname'].value;
    let address = this.myForm.controls['address'].value;
    let loader = this.loadingCtrl.create({
      content: "กําลังบันทึกข้อมูล..."
    });
    loader.present();
    this.authService.updateStudent(firstname,lastname,address,student_id).subscribe(
      res => {
        this.data = res; 
        if (this.data.status === 'ok') {
          let alert = this.alertCtrl.create({
            title: this.data.message,
            buttons: ['ตกลง']
          });
          alert.present();
          this.myForm.reset(); //reset form
        } else {
          let alert = this.alertCtrl.create({
            title: this.data.message,
            buttons: ['ตกลง']
          });
          alert.present();
        }
      },
      error => {
        this.errorMessage = <any> error
        console.log(this.errorMessage);
        loader.dismiss();
      },
      () => {
        loader.dismiss();
      }
    )
  }

  private removeStudent():void {

    let confirm = this.alertCtrl.create({
      title: 'ยืนยัน?',
      message: 'คุณต้องการที่จะลบข้อมูลใช่หรือไม่ ?',
      buttons: [
        {
          text: 'ไม่ลบ',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ลบ',
          handler: () => {
            console.log('Agree clicked');
            let student_id = this.student_id;
            let loader = this.loadingCtrl.create({
              content: "กําลังบันทึกข้อมูล..."
            });
            loader.present();
            this.authService.removeStudent(student_id).subscribe(
              res => {
                this.data = res; 
                if (this.data.status === 'ok') {
                  let alert = this.alertCtrl.create({
                    title: this.data.message,
                    buttons: ['ตกลง']
                  });
                  alert.present();
                  this.myForm.reset(); //reset form
                } else {
                  let alert = this.alertCtrl.create({
                    title: this.data.message,
                    buttons: ['ตกลง']
                  });
                  alert.present();
                }
              },
              error => {
                this.errorMessage = <any> error
                console.log(this.errorMessage);
                loader.dismiss();
              },
              () => {
                loader.dismiss();
              }
            )
          }
        }
      ]
    });
    confirm.present();


  }

  ionViewWillEnter() {
      this.getStudentDetail();
  }

  ionViewWillLeave() {
      this.sub.unsubscribe();
  }

}
