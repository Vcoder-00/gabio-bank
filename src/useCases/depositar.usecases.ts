import { FakeBankDatabase } from "../Infra-fake/bd-fake";
import { Response } from "../Comunicacao/types";

export class DepositarUseCase {
  constructor(private readonly bankDatabase: FakeBankDatabase) {}

  public async execute(accountId: string, value: number): Promise<Response> {
    const account = this.bankDatabase.findById(accountId);

    if (!account) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Conta não encontrada",
      };
    }

    account.saldo += value;

    return {
      STATUS: "OK",
      MESSAGE: "Depósito realizado com sucesso",
      BALANCE: account.saldo,
    };
  }
}
