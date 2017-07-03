import {Component} from "@angular/core";
//import { HomePage } from '../home/home';
import {TransactionsPage} from "../transactions/transactions";
import {MapPage} from "../map/map";
import {WalletsPage} from "../wallets/wallets";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TransactionsPage;
  tab2Root = MapPage;
  tab3Root = WalletsPage;

  constructor() {

  }
}
