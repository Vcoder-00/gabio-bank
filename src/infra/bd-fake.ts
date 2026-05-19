import { Conta } from "./contas";

export class bd_Contas {
    private contas: Map<string, Conta> = new Map([
        ["1001", new Conta("1001", 1000)],
        ["1002", new Conta("1002", 500)],
        ["1003", new Conta("1003", 750)],
    ]);

    buscar(id: string): Conta | undefined {
        return this.contas.get(id);
    }

    existe(id: string): boolean {
        return this.contas.has(id);
    }
}