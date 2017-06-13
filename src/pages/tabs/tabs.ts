import {Component} from "@angular/core";

import {AboutPage} from "../about/about";
import {ContactPage} from "../contact/contact";
//import { HomePage } from '../home/home';
import {TransactionsPage} from "../transactions/transactions";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TransactionsPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
