import type { Operation, Response } from '../protocolo';
import { Protocolo } from '../protocolo';

export class ProtocolHandler implements Protocolo {
  constructor(private ConsultaSaldoUseCase: ConsultaSaldoUseCase,
    private SacarUseCase: SacarUseCase,
    private DepositarUseCase: DepositarUseCase,
    private TransferirUseCase: TransferirUseCase
  ) {}

  public async handle(msg: Operation): Promise<Response> {
    switch (msg.OPERATION) {
      case "BALANCE":
        return this.ConsultaSaldoUseCase.execute(msg);

      case "WITHDRAW":
        return this.SacarUseCase.execute(msg);

      case "DEPOSIT":
        return this.DepositarUseCase.execute(msg);

      case "TRANSFER":
        return this.TransferirUseCase.execute(msg);

      default:
        return {
          STATUS: "ERROR",
          MESSAGE: "Operação inválida",
        };
    }
  }

  private async consultaSaldo(msg: Operation): Promise<Response> {
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
      msg.TO_COUNT_ID!,
      msg.VALUE!,
    );
  }
}