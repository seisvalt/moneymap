import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {IWallet, Wallet} from "../../db/database";
import {NewWalletPage} from "../new-wallet/new-wallet";
import {WalletService} from "../../services/wallets.service";
import {Toast} from "@ionic-native/toast";


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private walletService: WalletService,
              private toast: Toast) {
  }

  ionViewWillEnter() {
    Wallet.all().then(results => this.wallets = results);
  }

  set(wallet: Wallet) {
    this.walletService.setID(wallet.id);
  }

  delete(wallet: Wallet) {

    // validar si hay otras cartera
    if (this.wallets.length == 1)
      return this.showToast("Debes conservar almenos una cartera", "top");
    //validar que no es la cartera principal
    if (this.walletService.getID() == wallet.id)
      return this.showToast("Selecciona primero otra cartera", "bottom");
    //Eliminar de la interfaz
    this.wallets = this.wallets.filter(w => {
      return w.id != wallet.id;
    });

    wallet.delete();

  }

  showToast(message, position: string) {
    //Ambos codigos funcionan igual
    //this.toast.show(message, '5000', position).subscribe(console.log);
    this.toast.show(message, '5000', position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
