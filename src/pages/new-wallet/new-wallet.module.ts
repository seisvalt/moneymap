import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {NewWalletPage} from "./new-wallet";

@NgModule({
  declarations: [
    NewWalletPage,
  ],
  imports: [
    IonicPageModule.forChild(NewWalletPage),
  ],
  exports: [
    NewWalletPage
  ]
})
export class NewWalletPageModule {
}
