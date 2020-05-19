import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactionExist = await transactionsRepository.findOne(id);

    if (!transactionExist) {
      throw new AppError('Transaction does not exist');
    }

    await transactionsRepository.remove(transactionExist);
  }
}

export default DeleteTransactionService;
