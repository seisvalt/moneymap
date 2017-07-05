import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {Transaction} from "../../db/database";
import {GeolocationService} from "../../services/geolocation.service";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {WalletService} from "../../services/wallets.service";
import {TransactionService} from "../../services/transactions.service";


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

  model: Transaction = this.cleanTransaction();
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;
  imageData: string = null;
  income: boolean = false;

  constructor(private camera: Camera,
              public navCtrl: NavController,
              public navParams: NavParams,
              public geolocator: GeolocationService,
              private walletService: WalletService,
              private transactionService: TransactionService) {
  }

  ionViewDidLoad() {

  }

  getLocation() {
    if (this.shouldGeolocate) {
      this.shouldSend = false;
      this.geolocator.getLocation().then((resultado) => {

        this.model.setCoords(resultado.coords);
        console.log(this.model);
        this.shouldSend = true;
      }).catch((err) => {
        console.log(err);

      });
    } else {
      console.log("Mococlean");
      this.model.cleanCoords();
    }
  }

  getPhoto() {
    let cameraOptions: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageData = base64Image;
      this.model.imageUrl = this.imageData;
    }, (err) => {
      alert("error");
    });
  }

  save() {
    if (this.shouldSend) {
      this.model.amount = this.toInt();
      this.transactionService.save(this.model).then(result => {
        //al finalizar el guardado la promesa ejecuta un "limpiar el model"
        this.model = this.cleanTransaction();
        //se elimina la ultima vista de la pila
        this.navCtrl.pop();
      });
    }
  }

  cleanTransaction() {
    let transaction = new Transaction(null, "");
    transaction.walletId = this.walletService.getID();
    return transaction;
  }

  toInt() {
    let amount = parseInt(this.model.amount + "");

    if (!this.income) amount = amount * -1;
    return amount;
  }

}
