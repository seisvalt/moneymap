import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {IWallet, Wallet} from "../../db/database";

/**
 * Generated class for the WalletsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class WalletsPage {
  private wallets: IWallet[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    Wallet.all().then(results => this.wallets = results);
  }

}
