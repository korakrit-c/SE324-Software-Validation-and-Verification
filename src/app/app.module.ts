import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StudentPage } from '../pages/student/student';
import { StudentDetailPage } from '../pages/student-detail/student-detail';
import { StudentAddPage } from '../pages/student-add/student-add';
import { StudentEditPage } from '../pages/student-edit/student-edit';
import { ParentDetailPage } from '../pages/parent-detail/parent-detail';
import { CameraPage } from '../pages/camera/camera';

// Import Providers
import { StudentService } from '../providers/student-service';
import { SchoolService } from '../providers/school-service';
import { DepartmentService } from '../providers/department-service';
import { AuthService } from '../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StudentPage,
    StudentDetailPage,
    StudentAddPage,
    StudentEditPage,
    ParentDetailPage,
    CameraPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StudentPage,
    StudentDetailPage,
    StudentAddPage,
    StudentEditPage,
    ParentDetailPage,
    CameraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StudentService,
    AuthService,
    SchoolService,
    DepartmentService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
