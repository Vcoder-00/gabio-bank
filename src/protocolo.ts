export type Operation = {
  OPERATION: "BALANCE" | "TRANSFER" | "WITHDRAW" | "DEPOSIT";
  ACCOUNT_ID: string;
  TO_COUNT_ID: string | null;
  VALUE?: number;
};

export type Response = {
  STATUS: "OK" | "ERROR";
  MESSAGE: string;
  BALANCE?: number;
};

export interface Protocolo {
  handle(msg: Operation): Promise<Response>;
  consultarSaldo(accountId: string): Promise<Response>;
  sacar(accountId: string, value: number): Promise<Response>;
  depositar(accountId: string, value: number): Promise<Response>;
  transferir(
    fromAccountId: string,
    toAccountId: string,
    value: number,
  ): Promise<Response>;
}
