import { Operation } from "../Comunicacao/types";

export function parseMessage(mensagemBruta: string): Operation {
  const lines = mensagemBruta.split("\n");
  const data: Record<string, string> = {};

  // 1. Montar o dicionário de forma segura
  for (const line of lines) {
    if (!line.trim()) continue; // Ignora linhas em branco

    // Usa indexOf para separar apenas no PRIMEIRO dois-pontos
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      throw new Error("Mensagem mal formatada: linha sem separador ':'");
    }

    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();

    data[key] = value;
  }

  // 2. Validar OPERATION em tempo de execução
  const validOperations = [
    "BALANCE",
    "TRANSFER",
    "WITHDRAW",
    "DEPOSIT",
  ] as const;
  const operation = data.OPERATION;

  // O (any) aqui é necessário porque validOperations.includes espera tipos restritos
  if (!validOperations.includes(operation as any)) {
    throw new Error(`Operação inválida ou ausente: ${operation}`);
  }

  // 3. Validar ACCOUNT_ID
  if (!data.ACCOUNT_ID) {
    throw new Error("ACCOUNT_ID é obrigatório e não pode ser vazio");
  }

  // 4. Validar VALUE (se existir)
  let parsedValue: number | undefined = undefined;
  if (data.VALUE) {
    parsedValue = Number(data.VALUE);
    // isNaN protege contra strings como "abc", e <= 0 evita depósitos negativos
    if (isNaN(parsedValue) || parsedValue <= 0) {
      throw new Error(
        "VALUE deve ser um número numérico válido e maior que zero",
      );
    }
  }

  // 5. Retornar com segurança
  return {
    OPERATION: operation as Operation["OPERATION"],
    ACCOUNT_ID: data.ACCOUNT_ID,
    TO_ACCOUNT_ID: data.TO_ACCOUNT_ID || null,
    VALUE: parsedValue ?? 0,
  };
}
