import { bd_Contas } from "../infra/bd-fake";
import { Response } from "../Comunicacao/types";

export class SacarUseCase {
  constructor(private readonly bankDatabase: bd_Contas) {}

  public async execute(accountId: string, value: number): Promise<Response> {
    const account = this.bankDatabase.buscar(accountId);

    if (!account) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Conta não encontrada",
      };
    }

    if (value <= 0) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Valor de saque deve ser maior que zero",
      };
    }

    if (account.saldo < value) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Saldo insuficiente para saque",
      };
    }

    account.saldo -= value;

    this.bankDatabase.updateBalance(accountId, account.saldo);

    return {
      STATUS: "OK",
      MESSAGE: "Saque realizado com sucesso",
      BALANCE: account.saldo,
    };
  }
}
