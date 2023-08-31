import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class SimProvider {
  public static needsApplication = true

  constructor (protected application: ApplicationContract) {
  }

  public register () {
    this.application.container.singleton('Sim/LucidModel', () => {
      const { CamelCaseNamingStrategy } = require('../src/SimModel')

      return CamelCaseNamingStrategy
    })
  }

  public async boot () {
    const { string }  = (await import ('@ioc:Adonis/Core/Helpers'))
    const { SnakeCaseNamingStrategy } = (await import('@ioc:Adonis/Lucid/Orm'))

    class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
      public static serializedName(_model: typeof BaseModel, propertyName: string) {
        return string.camelCase(propertyName)
      }

      public static paginationMetaKeys() {
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

    const { BaseModel } = this.application.container.use('Adonis/Lucid/Orm')
    BaseModel.namingStrategy = new CamelCaseNamingStrategy()
  }

  public async ready () {
    
  }

  public async shutdown () {
    
  }
}