import { ApplicationContract } from '@ioc:Adonis/Core/Application'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = (await import('@ioc:Adonis/Lucid/Database')).default
|   const Event = (await import('@ioc:Adonis/Core/Event')).default
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class SimProvider {
  public static needsApplication = true

  constructor (protected application: ApplicationContract) {
  }

  public register () {
    
  }

  public async boot () {
    const { CamelCaseNamingStrategy } = (await import ('../src/SimModel'))

    const { BaseModel } = this.application.container.use('Adonis/Lucid/Orm')
    BaseModel.namingStrategy = new CamelCaseNamingStrategy()
  }

  public async ready () {
    
  }

  public async shutdown () {
    
  }
}