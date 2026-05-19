import { FakeBankDatabase } from "../Infra/bd-fake";
import { Response } from "../protocolo";

export class SacarUseCase {
  constructor(private readonly bankDatabase: FakeBankDatabase) {}

  public async execute(accountId: string, value: number): Promise<Response> {
    const account = this.bankDatabase.findById(accountId);

    if (!account) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Conta não encontrada",
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
