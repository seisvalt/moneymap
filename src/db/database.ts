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
  transactions: Dexie.Table<ITransaction, number>;

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

  static all() {
    //Retorna un promise
    return db.transactions.orderBy("id").reverse().toArray();
  }
}

export let db = new TransactionAppDb();
