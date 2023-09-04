import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class SimProvider {
  public static needsApplication = true;

  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Sim/Classes', () => {
      class Teste {
        public message: string = "teste"
      }

      return Teste
    })
  }

  public async boot() {
    const { BaseModel, SnakeCaseNamingStrategy } = this.app.container.use("Adonis/Lucid/Orm");
    const { string } = await import ('@poppinss/utils/build/helpers')
    class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
      public serializedName(_model: typeof BaseModel, propertyName: string) {
        return string.camelCase(propertyName)
      }
    
      public paginationMetaKeys() {
        return {
          total: 'total',
          perPage: 'perPage',
          currentPage: 'currentPage',
          lastPage: 'lastPage',
          firstPage: 'firstPage',
          firstPageUrl: 'firstPageUrl',
          lastPageUrl: 'lastPageUrl',
          nextPageUrl: 'nextPageUrl',
          previousPageUrl: 'previousPageUrl',
        }
      }
    }

    BaseModel.namingStrategy = new CamelCaseNamingStrategy();

    const Database = this.app.container.use("Adonis/Lucid/Database");
      Database.SimplePaginator.namingStrategy = {
        paginationMetaKeys() {
          return new CamelCaseNamingStrategy().paginationMetaKeys();
        },
      };
  }

  public async ready() {}

  public async shutdown() {}
}