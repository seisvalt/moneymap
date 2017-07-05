import {Injectable} from "@angular/core";
import {Transaction} from "../db/database";
import {WalletService} from "./wallets.service";

@Injectable()
export class TransactionService {
  constructor(private walletService: WalletService) {
  }

  all(): any {
    return Transaction.all(this.walletService.getID());
  }

  save(transaction: Transaction): any {
    let transactionSavePromise = transaction.save();
    return transactionSavePromise;
  }
}
