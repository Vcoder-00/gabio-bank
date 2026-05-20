import { Conta } from "./contas";

export class bd_Contas {
  contas = new Map<string, Conta>();
  constructor() {
    this.seed();
  }

  /**
   * Dados mockados iniciais
   */
  private seed() {
    this.contas.set("1", {
      id: "1",
      saldo: 1000,
    });

    this.contas.set("2", {
      id: "2",
      saldo: 500,
    });

    this.contas.set("3", {
      id: "3",
      saldo: 2500,
    });
  }

  buscar(id: string): Conta | null {
    const account = this.contas.get(id);

    if (!account) return null;

    return { ...account };
  }

  /**
   * Atualizar saldo
   */
  public updateBalance(id: string, saldo: number): void {
    const account = this.contas.get(id);

    if (!account) {
      throw new Error("Conta não encontrada");
    }

    account.saldo = saldo;

    this.contas.set(id, account);
  }

  existe(id: string): boolean {
    return this.contas.has(id);
  }
  /**
   * Listar contas
   */
  public getAll(): Conta[] {
    return Array.from(this.contas.values());
  }
}
