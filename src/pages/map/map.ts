import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  Marker,
  MarkerOptions
} from "@ionic-native/google-maps";
import {GeolocationService} from "../../services/geolocation.service";
import {ITransaction, Transaction} from "../../db/database";

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
  map: GoogleMap = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator: GeolocationService) {
  }

  //se carga solo una vez
  //ionViewDidLoad() {}
  //se carga cada vez que se llama la vista
  //the view is load when is call from controller
  ionViewDidEnter() {
    console.log('ionViewDidLoad MapPage');
    this.geolocator.getLocation().then((result) => {
      this.loadMap(result.coords.latitude, result.coords.longitude);
    }).catch((err) => console.log(err));
  }

  loadMap(lat, lng) {
    let location: LatLng = new LatLng(lat, lng);
    this.map = new GoogleMap("map", {
      'controls': {
        'compass': true,
        'indoorPicker': true
      },
      'camera': {
        'latLng': location,
        'zoom': 15
      }
    });
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => this.loadMarkers());
  }

  loadMarkers() {
    Transaction.all().then((results) => this.loadTransactionsMarkers(results));
  }

  private loadTransactionsMarkers(results: Array<ITransaction>) {

    for (var i = 0; i < results.length; ++i) {
      let transaction = results[i];
      let markerLocation: LatLng = new LatLng(transaction.lat, transaction.lng);
      let markerOptions: MarkerOptions = {
        position: markerLocation,
        title: transaction.title,
        icon: "blue"
      };
      this.map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
      }).catch(err => console.log(err));
    }
  }
}
