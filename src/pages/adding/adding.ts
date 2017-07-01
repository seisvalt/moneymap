import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {Transaction} from "../../db/database";
import {GeolocationService} from "../../services/geolocation.service";
import {Camera, CameraOptions} from "@ionic-native/camera";


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
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;
  imageData: string = null;

  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public geolocator: GeolocationService) {
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
    }, (err) => {
      alert("error");
    });
  }

  save() {
    if (this.shouldSend) {
      this.model.save().then(result => {
        //al finalizar el guardado la promesa ejecuta un "limpiar el model"
        this.model = new Transaction(null, "");
        //se elimina la ultima vista de la pila
        this.navCtrl.pop();
      });
    }
  }

}
