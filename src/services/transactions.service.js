import { APIService } from './api.service';
import { TRANSACTIONS } from '../config/route';
import URLService from './URL.service';

class TransactionService {
  static async createTransactions(info) {
    try {
      const query = URLService.stringify(info);
      const response = await new APIService(
        'post',
        TRANSACTIONS,
        null,
        info,
        true,
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  } 
}

export default TransactionService;