import type { Operation, Response } from "./types";
import { ConsultaSaldoUseCase } from "../useCases/consultarSaldo.usecases";
import { SacarUseCase } from "../useCases/sacar.usecases";
import { DepositarUseCase } from "../useCases/depositar.usecases";
import { TransferirUseCase } from "../useCases/transferir.usecases";
import { parseMessage } from "../Adapter/mensagemParser";

export class ProtocolHandler {
  constructor(
    private ConsultaSaldoUseCase: ConsultaSaldoUseCase,
    private SacarUseCase: SacarUseCase,
    private DepositarUseCase: DepositarUseCase,
    private TransferirUseCase: TransferirUseCase,
  ) {}

  public async handle(msg: Operation): Promise<Response> {
    switch (msg.OPERATION) {
      case "BALANCE":
        return this.consultarSaldo(msg);

      case "WITHDRAW":
        return this.sacar(msg);

      case "DEPOSIT":
        return this.depositar(msg);

      case "TRANSFER":
        return this.transferir(msg);

      default:
        return {
          STATUS: "ERROR",
          MESSAGE: "Operação inválida",
        };
    }
  }
  private async consultarSaldo(msg: Operation): Promise<Response> {
    return this.ConsultaSaldoUseCase.execute(msg.ACCOUNT_ID);
  }

  private async sacar(msg: Operation): Promise<Response> {
    return this.SacarUseCase.execute(msg.ACCOUNT_ID, msg.VALUE!);
  }

  private async depositar(msg: Operation): Promise<Response> {
    return this.DepositarUseCase.execute(msg.ACCOUNT_ID, msg.VALUE!);
  }

  private async transferir(msg: Operation): Promise<Response> {
    return this.TransferirUseCase.execute(
      msg.ACCOUNT_ID,
      msg.TO_ACCOUNT_ID!,
      msg.VALUE!,
    );
  }
}
