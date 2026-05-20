import { FakeBankDatabase } from "../Infra-fake/bd-fake";
import { Response } from "../Comunicacao/types";

export class ConsultaSaldoUseCase {
  constructor(private readonly bankDatabase: FakeBankDatabase) {}

  public async execute(accountId: string): Promise<Response> {
    const account = this.bankDatabase.findById(accountId);

    if (!account) {
      return {
        STATUS: "ERROR",
        MESSAGE: "Conta não encontrada",
      };
    }

    return {
      STATUS: "OK",
      MESSAGE: "Saldo consultado com sucesso",
      BALANCE: account.saldo,
    };
  }
}
