import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { SchoolService } from '../../providers/school-service';
import { School } from '../../models/school'; 
import { DepartmentService } from '../../providers/department-service';
import { Department } from '../../models/department'; 
import { DepartmentItem } from '../../models/department-item'; 
import { FeedBack } from '../../models/feedback';
import { Subscription } from 'rxjs/Subscription'; 

@Component({
  selector: 'page-student-add',
  templateUrl: 'student-add.html'
})
export class StudentAddPage {
    myForm: FormGroup;
    schools: School[];
    departments: Department[];
    sFirstname: FormControl;
    sLastname: FormControl;
    sAddress: FormControl;
    sDob: FormControl;
    school: FormControl;
    department: FormControl;
    sDegree: FormControl;
    pFirstname: FormControl;
    pLastname: FormControl;
    pAddress: FormControl;
    pDob: FormControl;
    sub:Subscription;
    errorMessage:string;
    data:FeedBack;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private authService:AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private schoolService:SchoolService,
              private departmentService:DepartmentService) {

    this.sFirstname = fb.control('',Validators.required);
    this.sLastname = fb.control('',Validators.required);
    this.sAddress = fb.control('',Validators.required);
    this.sDob = fb.control('',Validators.required);
    this.pFirstname = fb.control('',Validators.required);
    this.pLastname = fb.control('',Validators.required);
    this.pAddress = fb.control('',Validators.required);
    this.pDob = fb.control('',Validators.required);
    this.school = fb.control('',Validators.required);
    this.department = fb.control('',Validators.required);
    this.sDegree = fb.control('', Validators.compose([Validators.required, Validators.maxLength(20)]));
    this.myForm = fb.group({
      'sFirstname': this.sFirstname,
      'sLastname': this.sLastname,
      'sAddress': this.sAddress,
      'sDob': this.sDob,
      'sDegree': this.sDegree,
      'school': this.school,
      'department': this.department,
      'pFirstname': this.pFirstname,
      'pLastname': this.pLastname,
      'pAddress': this.pAddress,
      'pDob': this.pDob
    })
  }

  private getSchools() {    
    this.sub = this.schoolService.getSchool().subscribe( 
      (res) => this.schools = res,
      (error) => this.errorMessage = <any> error
    );
  }

  private getDepartment(s) {    
    this.sub = this.departmentService.getDepartment(s).subscribe( 
      (res) => this.departments = res,
      (error) => this.errorMessage = <any> error
    );
  }

  private departmentEvent(s) {
    console.log(s)
    this.getDepartment(s)
  }

  ionViewWillEnter() {
      this.getSchools();
  }

  ionViewWillLeave() {
      this.sub.unsubscribe();
  }

  private addStudent(){
    let sFirstname = this.myForm.controls['sFirstname'].value;
    let sLastname = this.myForm.controls['sLastname'].value;
    let sAddress = this.myForm.controls['sAddress'].value;
    let sDob = this.myForm.controls['sDob'].value;
    let sDegree = this.myForm.controls['sDegree'].value;
    let school = this.myForm.controls['school'].value;
    let department = this.myForm.controls['department'].value;
    let pFirstname = this.myForm.controls['pFirstname'].value;
    let pLastname = this.myForm.controls['pLastname'].value;
    let pAddress = this.myForm.controls['pAddress'].value;
    let pDob = this.myForm.controls['pDob'].value;

    let loader = this.loadingCtrl.create({
      content: "กําลังบันทึกข้อมูล..."
    });
    loader.present();
    this.authService.addStudent(sFirstname,sLastname,sAddress,sDob,sDegree,school,department,pFirstname,pLastname,pAddress,pDob).subscribe(
      res => {
        this.data = res; 
        if (this.data.status === 'ok') {
          let alert = this.alertCtrl.create({
            title: this.data.message,
            buttons: ['ตกลง']
          });
          alert.present();
          this.myForm.reset();
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
        let alert = this.alertCtrl.create({
          title: "Error",
          buttons: ['ตกลง']
        });
        alert.present();
        console.log("Error : "+this.errorMessage);
        loader.dismiss();
      },
      () => {
        loader.dismiss();
      }
    )
  }

}
