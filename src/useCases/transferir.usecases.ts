import { bd_Contas } from "../infra/bd-fake";
import { Response } from "../Comunicacao/types";

export class TransferirUseCase {
  constructor(private readonly bankDatabase: bd_Contas) {}

  public async execute(
    fromAccountId: string,
    toAccountId: string,
    value: number,
  ): Promise<Response> {
    const fromAccount = this.bankDatabase.buscar(fromAccountId);
    const toAccount = this.bankDatabase.buscar(toAccountId);

    if (!fromAccount || !toAccount) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Conta de origem ou destino não encontrada",
      };
    }

    if (value <= 0) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Valor de saque deve ser maior que zero",
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
