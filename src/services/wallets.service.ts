import {Injectable} from "@angular/core";
import {Wallet} from "../db/database";

export const StorageKey = "walletID";

@Injectable()
export class WalletService {

  setID(walletID) {
    localStorage.setItem(StorageKey, walletID);
  }

  getID(): number {
    return parseInt(localStorage.getItem(StorageKey));
  }

  validateFristWallet() {
    return new Promise((resolve, reject) => {
      Wallet.frist().then((wallet) => {
        //Ejecucion de la promesa al buscar cartera
        if (!wallet) {
          Wallet.createFrist().then((resultado) => {
            this.setID(resultado);
            resolve();
          })
        } else {
          this.setID(wallet.id);
          resolve();
        }
      });
      resolve()
    })
  }
}
