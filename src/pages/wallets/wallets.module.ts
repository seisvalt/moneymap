import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {WalletsPage} from "./wallets";

@NgModule({
  declarations: [
    WalletsPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletsPage),
  ],
  exports: [
    WalletsPage
  ]
})
export class WalletsPageModule {
}
