import Dexie from "dexie";

export interface ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  imageUrl: string;
  title: string;
}
export class TransactionAppDb extends Dexie {
  transactions: Dexie.Table<Transaction, number>;

  constructor() {
    super("moneymapdb");
    this.version(1).stores({
      transactions: '++id, amount, lat, lng, imageUrl, title',
    });

    this.transactions.mapToClass(Transaction);
  }
}

export class Transaction implements ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  imageUrl: string;
  title: string;

  constructor(amount: number, title: string, lat?: number, lng?: number, imageUrl?: string, id?: number) {
    this.amount = amount;
    this.title = title;
    if (lat) this.lat = lat;
    if (lng) this.lng = lng;
    if (imageUrl) this.imageUrl = imageUrl;
    if (lat) this.id = id;
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

  static all() {
    //Retorna un promise
    return db.transactions.orderBy("id").reverse().toArray();
  }

  getImage(): string {
    if (this.imageUrl)
      return this.imageUrl;
    else
      return "blue";
  }
}

export let db = new TransactionAppDb();
