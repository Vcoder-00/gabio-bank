import { bd_Contas } from "../infra/bd-fake";
import { Response } from "../Comunicacao/types";

export class DepositarUseCase {
  constructor(private readonly bankDatabase: bd_Contas) {}

  public async execute(accountId: string, value: number): Promise<Response> {
    const account = this.bankDatabase.buscar(accountId);

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
