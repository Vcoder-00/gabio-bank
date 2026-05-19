import http from "http";
import { WebSocketServer, WebSocket } from "ws";

import { ProtocolHandler } from "./protocoloHandler";
import { Operation, Response } from "../protocolo";

export class AppWebSocketServer {
  private readonly httpServer: http.Server;
  private readonly wss: WebSocketServer;

  constructor(
    private readonly protocolHandler: ProtocolHandler,
    private readonly port: number = 7001,
  ) {
    this.httpServer = http.createServer(
      this.handleHttpRequest,
    );

    this.wss = new WebSocketServer({
      server: this.httpServer,
    });
  }

  public start(): void {
    this.configureWebSocket();

    this.httpServer.listen(this.port, () => {
      console.log(
        `Servidor WebSocket rodando na porta ${this.port}`,
      );
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
    this.wss.on(
      "connection",
      (ws: WebSocket) => {
        console.log("Cliente conectado");

        ws.on("message", async (data) => {
          await this.handleMessage(ws, data);
        });

        ws.on("close", () => {
          console.log("Cliente desconectado");
        });
      },
    );
  }

  private async handleMessage(
    ws: WebSocket,
    data: Buffer,
  ): Promise<void> {
    try {
        // Formatação da mensagem recebida para o formato esperado (Operation)
      const message: Operation =
        JSON.parse(data.toString());

      const response =
        await this.protocolHandler.handle(
          message,
        );

      ws.send(JSON.stringify(response));
    } catch (error) {
      ws.send(
        JSON.stringify({
          STATUS: "ERROR",
          MESSAGE: "Mensagem inválida",
        }),
      );
    }
  }
}