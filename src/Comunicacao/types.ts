export type Operation = {
  OPERATION: "BALANCE" | "TRANSFER" | "WITHDRAW" | "DEPOSIT";
  ACCOUNT_ID: string;
  TO_ACCOUNT_ID: string | null;
  VALUE?: number;
};

export type Response = {
  STATUS: "OK" | "ERROR";
  MESSAGE: string;
  BALANCE?: number;
};
