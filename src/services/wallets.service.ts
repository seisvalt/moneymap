import {Injectable} from "@angular/core";
import {Wallet} from "../db/database";

@Injectable()
export class WalletService {
  validateFristWallet() {
    return new Promise((resolve, reject) => {
      Wallet.frist().then((wallet) => {
        //Ejecucion de la promesa al buscar cartera
        if (!wallet) {
          Wallet.createFrist().then((resultado) => {
            resolve();
          })
        } else {
          resolve();
        }
      });
      resolve()
    })
  }
}
