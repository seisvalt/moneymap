import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {AddingPage} from "../adding/adding";
import {WalletService} from "../../services/wallets.service";
import {TransactionService} from "../../services/transactions.service";

/**
 * Generated class for the TransactionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  title: string = 'Movimientos :)';
  transactions: any;
  addingPage = AddingPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private walletService: WalletService,
              private transactionService: TransactionService) {
  }

  //metodo se ejecuta cuando se carga la primera vez la vista
  /*  ionViewDidLoad() {
    //console.log('ionViewDidLoad TransactionsPage');
    //let transaction = new Transaction(20, "primera");
    //transaction.save();
    this.loadTransactions();
   }*/

  //se ejecuta cadavez que la vista sea mostrada
  ionViewWillEnter() {

    this.walletService.validateFristWallet();
    console.log(this.walletService.getID());
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.all()
      .then((resultados) => {
        this.transactions = resultados;
        console.log("bla");
      }).catch(err => {
      console.log("podrido");
      console.log(err)
      });
  }

}
