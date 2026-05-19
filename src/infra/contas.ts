export class Conta {

  constructor(
    private id: string,
    private saldo: number
  ) {}

  public getId(): string {
    return this.id;
  }

  public getSaldo(): number {
    return this.saldo;
  }

  public alteraSaldo(novo:number){
    this.saldo = novo;
  }


  }