import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {AddingPage} from "./adding";

@NgModule({
  declarations: [
    AddingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddingPage),
  ],
  exports: [
    AddingPage
  ]
})
export class AddingPageModule {
}
