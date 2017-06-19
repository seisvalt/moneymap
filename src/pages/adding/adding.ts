import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {Transaction} from "../../db/database";
import {GeolocationService} from "../../services/geolocation.service";


/**
 * Generated class for the AddingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-adding',
  templateUrl: 'adding.html',
})
export class AddingPage {

  model: Transaction = new Transaction(null, "");

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator: GeolocationService) {
  }

  ionViewDidLoad() {
    console.log("bla");
    this.geolocator.getLocation().then((resultado) => {
      console.log(resultado);
    }).catch((err) => console.log(err));
  }

  save() {
    this.model.save().then(result => {
      //al finalizar el guardado la promesa ejecuta un "limpiar el model"
      this.model = new Transaction(null, "");
      //se elimina la ultima vista de la pila
      this.navCtrl.pop();
    });
  }

}
