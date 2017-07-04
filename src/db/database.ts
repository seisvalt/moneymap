import Dexie from "dexie";

export interface ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  imageUrl: string;
  title: string;
}

export interface IWallet {
  id?: number;
  amount: number;
  name: string;
}
export class TransactionAppDb extends Dexie {
  transactions: Dexie.Table<Transaction, number>;
  wallets: Dexie.Table<Wallet, number>;

  constructor() {
    super("moneymapdb");
    this.version(1).stores({
      transactions: '++id, amount, lat, lng, imageUrl, title',
    });
    this.version(2).stores({
      transactions: '++id, amount, lat, lng, imageUrl, title',
      wallets: '++id, amount, name',
    });
    this.version(3).stores({
      transactions: '++id, amount, lat, lng, imageUrl, title, walletId',
      wallets: '++id, amount, name',
    });

    this.transactions.mapToClass(Transaction);
    this.wallets.mapToClass(Wallet);

  }
}

export class Transaction implements ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  imageUrl: string;
  title: string;
  walletId: number;

  constructor(amount: number, title: string, lat?: number, lng?: number, imageUrl?: string, id?: number, walletId?: number) {
    this.amount = amount;
    this.title = title;
    if (lat) this.lat = lat;
    if (lng) this.lng = lng;
    if (imageUrl) this.imageUrl = imageUrl;
    if (id) this.id = id;
    if (walletId) this.walletId = walletId;
  }

  save() {
    return db.transactions.add(this);
  }

  setCoords(coords) {
    this.lat = coords.latitude;
    this.lng = coords.longitude;
  }

  cleanCoords() {
    this.lat = null;
    this.lng = null;
  }

  hasLocation(): boolean {
    return !!(this.lat && this.lng); //!! doble negacion devuelve el inverso en boleean
  }

  static all(walletID) {
    //Retorna un promise
    return db.transactions
      .where("walletId")
      .equals(parseInt(walletID))
      .reverse()
      .toArray();
  }

  getImage(): string {
    if (this.imageUrl)
      return this.imageUrl;
    else
      return "blue";
  }
}

export class Wallet implements IWallet {
  id?: number;
  amount: number;
  name: string;

  constructor(amount: number, name: string, id?: number) {
    if (id) this.id = id;
    this.amount = amount;
    this.name = name;
  }

  save() {
    return db.wallets.add(this);
  }

  delete() {
    db.wallets.delete(this.id);
  }

  static createFrist() {
    let wallet = new Wallet(0, "La cartera");
    return wallet.save();
  }

  static frist() {
    return db.wallets.orderBy("id").limit(1).first();
  }

  static all() {
    return db.wallets.orderBy("id").toArray();
  }

}

export let db = new TransactionAppDb();
//Wallets.createFrist();
