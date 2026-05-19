import { FakeBankDatabase } from "../Infra/bd-fake";
import { Response } from "../protocolo";

class ConsultaSaldoUseCase {
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
