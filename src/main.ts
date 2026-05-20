import { AppWebSocketServer } from "./Comunicacao/server";
import { ProtocolHandler } from "./Comunicacao/protocoloHandler";
import { ConsultaSaldoUseCase } from "./useCases/consultarSaldo.usecases";
import { SacarUseCase } from "./useCases/sacar.usecases";
import { DepositarUseCase } from "./useCases/depositar.usecases";
import { TransferirUseCase } from "./useCases/transferir.usecases";
import { bd_Contas } from "./infra/bd-fake";

async function bootstrap() {
  // 1. Instanciar infraestrutura (Banco de dados Fake)
  const bankDatabase = new bd_Contas();

  // 2. Instanciar Casos de Uso (Negócio)
  const consultaSaldoUseCase = new ConsultaSaldoUseCase(bankDatabase);
  const sacarUseCase = new SacarUseCase(bankDatabase);
  const depositarUseCase = new DepositarUseCase(bankDatabase);
  const transferirUseCase = new TransferirUseCase(bankDatabase);

  // 3. Instanciar Protocol Handler (Roteador de Comandos)
  const protocolHandler = new ProtocolHandler(
    consultaSaldoUseCase,
    sacarUseCase,
    depositarUseCase,
    transferirUseCase
  );

  // 4. Instanciar e iniciar o servidor WebSocket
  const server = new AppWebSocketServer(protocolHandler);

  server.start();
}

bootstrap().catch((error) => {
  console.error("Erro ao iniciar a aplicação:", error);
});
