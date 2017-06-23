import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {GoogleMap, LatLng} from "@ionic-native/google-maps";
import {GeolocationService} from "../../services/geolocation.service";

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator: GeolocationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.geolocator.getLocation().then((result) => {
      this.loadMap(result.coords.latitude, result.coords.longitude);
    }).catch((err) => console.log(err));
  }

  loadMap(lat, lng) {
    let location: LatLng = new LatLng(lat, lng);
    new GoogleMap("map", {
      'controls': {
        'compass': true,
        'indoorPicker': true
      },
      'camera': {
        'latLng': location,
        'zoom': 15
      }
    })
  }

}
