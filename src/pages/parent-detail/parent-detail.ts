import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'; 

import { StudentDetailPage } from '../student-detail/student-detail';
import { StudentService } from '../../providers/student-service'; 
import { FeedBack } from '../../models/feedback';
import { Parent } from '../../models/parent';

@Component({
  selector: 'page-parent-detail',
  templateUrl: 'parent-detail.html'
})
export class ParentDetailPage {

  sub:Subscription;
  parent_id:number;
  errorMessage:string;
  parent: Parent[];
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private studentService:StudentService) {
    this.parent_id = this.navParams.get('parent_id'); // Get data from student-detail.ts
  }

  private getParentDetail(){
    this.sub = this.studentService.getParentDetail(this.parent_id).subscribe(
      (res) => this.parent = res,
      (error) => this.errorMessage = <any> error
    );
  }

  ionViewWillEnter() {
      this.getParentDetail();
  }

  ionViewWillLeave() {
      this.sub.unsubscribe();
  }

}
