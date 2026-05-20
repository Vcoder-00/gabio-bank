# Arquitetura do Projeto - Gabio Bank (Sockets 2)

Este projeto implementa um servidor de transações bancárias utilizando WebSockets. A arquitetura foi desenhada seguindo princípios de separação de responsabilidades (Clean Architecture / Hexagonal), permitindo que a lógica de negócio seja independente dos detalhes de infraestrutura e comunicação.

## Estrutura de Pastas



## Camadas do Sistema

### 1. Comunicação (`src/Comunicacao/`)
Responsável por gerenciar a conexão WebSocket e o fluxo de mensagens.
- **`server.ts`**: Inicializa o servidor WebSocket (usando a biblioteca `ws`) e o servidor HTTP para upgrade de conexão. Ele recebe mensagens brutas, delega o parsing e encaminha para o handler de protocolo.
- **`protocoloHandler.ts`**: Atua como o roteador da aplicação. Recebe um objeto `Operation` tipado e invoca o Caso de Uso (Use Case) correspondente.

### 2. Adapters / Parsing (`src/Adapter/`)
Responsável pela tradução entre o mundo externo (strings brutas) e o mundo interno (objetos tipados).
- **`mensagemParser.ts`**: Implementa o protocolo customizado de texto. Transforma strings no formato `CHAVE: VALOR` em objetos `Operation`.

### 3. Casos de Uso / Regras de Negócio (`src/useCases/`)
Contém a lógica central da aplicação bancária. Cada arquivo representa uma operação única e isolada:
- `ConsultarSaldo`: Retorna o saldo atual de uma conta.
- `Sacar`: Valida e subtrai valores de uma conta.
- `Depositar`: Adiciona valores a uma conta.
- `Transferir`: Orquestra a movimentação de valores entre duas contas.

### 4. Infraestrutura / Dados (`src/Infra-fake/`)
Responsável pela persistência e acesso aos dados.
- **`bd-fake.ts`**: Simula um banco de dados em memória utilizando um `Map`. Fornece métodos como `findById` e `updateBalance`.

### 5. Tipos Globais (`src/types.ts`)
Define as interfaces e tipos que permeiam todas as camadas, garantindo consistência no contrato de dados.

## Protocolo de Comunicação

Diferente de APIs REST convencionais, este projeto utiliza um protocolo de texto puro (Plain Text) para minimizar overhead e seguir requisitos específicos de redes de computadores.

### Formato de Requisição
As mensagens enviadas pelo cliente devem seguir o padrão `CHAVE: VALOR`, com cada campo em uma nova linha.
**Exemplo:**
```text
OPERATION: TRANSFER
ACCOUNT_ID: 1
TO_ACCOUNT_ID: 2
VALUE: 100
```

### Formato de Resposta
As respostas do servidor também seguem o formato de texto puro:
**Exemplo de Sucesso:**
```text
STATUS: OK
MESSAGE: Transferência realizada com sucesso
BALANCE: 900
```

**Exemplo de Erro:**
```text
STATUS: ERROR
MESSAGE: Saldo insuficiente
```

## Fluxo de Dados
1. O Cliente envia uma **String** via WebSocket.
2. O **Server** recebe a string e chama o **Parser**.
3. O **Parser** valida a sintaxe e retorna um objeto **Operation**.
4. O **ProtocolHandler** recebe a **Operation** e chama o **UseCase** correto.
5. O **UseCase** interage com o **FakeBankDatabase**.
6. O **UseCase** retorna um objeto **Response**.
7. O **Server** formata a **Response** de volta para **String** e envia ao Cliente.
