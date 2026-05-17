type operation = {
  OPERATION: "BALANCE" | "TRANSFER" | "WITHDRAW" | "DEPOSIT";
  ACCOUNT_ID: string;
  TO_COUNT_ID: string | null;
  VALUE?: number;
};

type response = {
  STATUS: "OK" | "ERROR";
  MESSAGE: string;
  BALANCE?: number;
};

export class protocolo {
  constructor(public msg: operation) {}

  public consultaSaldo(): Promise<response> {
    try {
      return _consultarSaldo(this.msg.ACCOUNT_ID);
    } catch (error) {
      return Promise.resolve({ STATUS: "ERROR", MESSAGE: "Erro ao consultar saldo" });
    }
  }

  public sacar(): Promise<response> {
    try {
      return _sacar(this.msg.ACCOUNT_ID, this.msg.VALUE!);
    } catch (error) {
      return Promise.resolve({ STATUS: "ERROR", MESSAGE: "Erro ao realizar saque" });
    }
  }

  public depositar(): Promise<response> {
    try {
      return _depositar(this.msg.ACCOUNT_ID, this.msg.VALUE!);
      return Promise.resolve({ STATUS: "OK", MESSAGE: "Depósito realizado com sucesso" });
    } catch (error) {
      return Promise.resolve({ STATUS: "ERROR", MESSAGE: "Erro ao realizar depósito" });
    }
  }

  public transferir(): Promise<response> {
    try {
      return _transferir(
        this.msg.ACCOUNT_ID,
        this.msg.TO_COUNT_ID!,
        this.msg.VALUE!,
      );
    } catch (error) {
      return Promise.resolve({ STATUS: "ERROR", MESSAGE: "Erro ao realizar transferência" });
    }
  }
}
