import http from "http";
import { WebSocketServer, WebSocket, RawData } from "ws";
import { parseMessage } from "../Adapter/mensagemParser";
import { ResponseSerializer } from "../Adapter/ResponseSerializer";
import { ProtocolHandler } from "./protocoloHandler";
import { Operation, Response } from "./types";

export class AppWebSocketServer {
  private readonly httpServer: http.Server;
  private readonly wss: WebSocketServer;

  constructor(
    private readonly protocolHandler: ProtocolHandler,
    private readonly port: number = 7001,
  ) {
    this.httpServer = http.createServer(this.handleHttpRequest);

    this.wss = new WebSocketServer({
      server: this.httpServer,
    });
  }

  public start(): void {
    this.configureWebSocket();

    this.httpServer.listen(this.port, () => {
      console.log(`Servidor WebSocket rodando na porta ${this.port}`);
    });
  }

  private handleHttpRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ): void {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("WebSocket server running");
  }

  private configureWebSocket(): void {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("Cliente conectado");

      ws.on("message", async (data) => {
        await this.handleMessage(ws, data);
      });

      ws.on("close", () => {
        console.log("Cliente desconectado");
      });
    });
  }

  private async handleMessage(ws: WebSocket, data: RawData): Promise<void> {
    try {
      // Formatação da mensagem recebida para o formato esperado (Operation)
      const message: Operation = parseMessage(data.toString());

      const response: Response = await this.protocolHandler.handle(message);

      ws.send(ResponseSerializer.serialize(response));
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Mensagem inválida (servidor não conseguiu processar a mensagem recebida)";

      ws.send(
        ResponseSerializer.serialize({
          STATUS: "ERROR",
          MESSAGE: errorMessage,
        }),
      );
    }
  }
}
