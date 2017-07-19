import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUserPasswordPage } from './edit-user-password';

@NgModule({
  declarations: [
    EditUserPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(EditUserPasswordPage),
  ],
  exports: [
    EditUserPasswordPage
  ]
})
export class EditUserPageModule {}
