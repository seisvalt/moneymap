/**
 * Created by varoz on 13/06/17.
 */
import {Injectable} from "@angular/core";
import {Geolocation} from "@ionic-native/geolocation";

@Injectable()
export class GeolocationService {

  constructor(private geolocation: Geolocation) {
  }

  getLocation() {
    return this.geolocation.getCurrentPosition();
  }
}
