import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {IWallet, Wallet} from "../../db/database";
import {NewWalletPage} from "../new-wallet/new-wallet";
import {WalletService} from "../../services/wallets.service";

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
  addingPage = NewWalletPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private walletService: WalletService) {
  }

  ionViewWillEnter() {
    Wallet.all().then(results => this.wallets = results);
  }

  set(wallet: Wallet) {
    this.walletService.setID(wallet.id);
  }

  delete(wallet: Wallet) {
    //Eliminar de la interfaz
    this.wallets = this.wallets.filter(w => {
      return w.id != wallet.id;
    });

    wallet.delete();

  }

}
