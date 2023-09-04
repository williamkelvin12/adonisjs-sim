declare module '@ioc:Sim/Classes' {
  interface teste {
    message: string
  }

  export interface TesteContract {
    new (): teste
  }

  const Teste: TesteContract

  export default Teste
}