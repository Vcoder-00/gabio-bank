# Gabio Bank

Sistema bancário simples utilizando WebSocket e arquitetura em camadas com TypeScript.

---

# Tecnologias

- TypeScript
- Node.js
- WebSocket (`ws`)
- Arquitetura em Camadas

---

# Funcionalidades

- Consultar saldo
- Depositar
- Sacar
- Transferir valores
- Comunicação em tempo real via WebSocket

---

# Estrutura do Projeto

```txt
src
├── Adapter
│   ├── mensagemParser.ts
│   └── ResponseSerializer.ts
│
├── Comunicacao
│   ├── protocoloHandler.ts
│   ├── server.ts
│   └── types.ts
│
├── infra
│   ├── bd-fake.ts
│   └── contas.ts
│
├── useCases
│   ├── consultarSaldo.usecases.ts
│   ├── depositar.usecases.ts
│   ├── sacar.usecases.ts
│   └── transferir.usecases.ts
│
├── main.ts
└── protocolo.ts
```

---

# Como Executar

## Instalar dependências

```bash
npm install
```

---

## Rodar o projeto

```bash
npm run dev
```

ou

```bash
npm start
```

---
# Porta do Servidor

O servidor WebSocket roda na porta:

```txt
7001
```

---

# Operações Disponíveis

## Consultar saldo

```txt
OPERATION:BALANCE
ACCOUNT_ID:1
```

---

## Depositar

```txt
OPERATION:DEPOSIT
ACCOUNT_ID:1
VALUE:100
```

---

## Sacar

```txt
OPERATION:WITHDRAW
ACCOUNT_ID:1
VALUE:50
```

---

## Transferir

```txt
OPERATION:TRANSFER
ACCOUNT_ID:1
TO_ACCOUNT_ID:2
VALUE:200
```

---

# Exemplo de Resposta

```txt
STATUS:OK
MESSAGE:Saldo consultado com sucesso
BALANCE:1000
```

---

# Arquitetura

O projeto segue arquitetura em camadas:

- Adapter
- Comunicação
- Infraestrutura
- Casos de Uso

Fluxo:

```txt
Cliente
   ↓
WebSocket Server
   ↓
Parser
   ↓
ProtocolHandler
   ↓
UseCases
   ↓
Banco Fake
```

---