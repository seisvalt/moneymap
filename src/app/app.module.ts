import {ErrorHandler, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";

import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
import {TabsPage} from "../pages/tabs/tabs";

import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {TransactionsPage} from "../pages/transactions/transactions";
import {AddingPage} from "../pages/adding/adding";
import {GeolocationService} from "../services/geolocation.service";
import {Geolocation} from "@ionic-native/geolocation";
import {MapPage} from "../pages/map/map";
import {Camera} from "@ionic-native/camera";
import {WalletsPage} from "../pages/wallets/wallets";
import {WalletService} from "../services/wallets.service";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TransactionsPage,
    AddingPage,
    MapPage,
    WalletsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TransactionsPage,
    AddingPage,
    MapPage,
    WalletsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GeolocationService,
    Geolocation,
    Camera,
    WalletService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
