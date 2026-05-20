import { bd_Contas } from "../infra/bd-fake";
import { Response } from "../Comunicacao/types";

export class ConsultaSaldoUseCase {
  constructor(private readonly bankDatabase: bd_Contas) {}

  public async execute(accountId: string): Promise<Response> {
    const account = this.bankDatabase.buscar(accountId);

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
