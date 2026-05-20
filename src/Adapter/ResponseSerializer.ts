import { Response } from "../Comunicacao/types";

export class ResponseSerializer {
  public static serialize(response: Response): string {
    return [
      `STATUS:${response.STATUS}`,
      `MESSAGE:${response.MESSAGE}`,
      `BALANCE:${response.BALANCE ?? ""}`,
    ].join("\n");
  }
}
