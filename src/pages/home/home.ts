import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StudentAddPage } from '../student-add/student-add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  private openAddStudent() {
    this.navCtrl.push(StudentAddPage);
  }

}
