import { FakeBankDatabase } from "../Infra/bd-fake";
import { Response } from "../protocolo";


export class TransferirUseCase {
  constructor(private readonly bankDatabase: FakeBankDatabase) {}

  public async execute(
    fromAccountId: string,
    toAccountId: string,
    value: number,
  ): Promise<Response> {
    const fromAccount = this.bankDatabase.findById(fromAccountId);
    const toAccount = this.bankDatabase.findById(toAccountId);

    if (!fromAccount || !toAccount) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Conta de origem ou destino não encontrada",
      };
    }

    if (fromAccount.saldo < value) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Saldo insuficiente para transferência",
      };
    }

    fromAccount.saldo -= value;
    toAccount.saldo += value;

    return {
      STATUS: "OK",
      MESSAGE: "Transferência realizada com sucesso",
      BALANCE: fromAccount.saldo,
    };
  }
}