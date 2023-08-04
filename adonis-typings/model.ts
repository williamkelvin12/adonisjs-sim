declare module '@ioc:Adonis/Addons/Sim' {
	import { BaseModel, LucidModel, ModelRelations, NamingStrategyContract } from '@ioc:Adonis/Lucid/Orm'

	type SnakeCase = {
		new (): NamingStrategyContract
	}

	type metaKeys = {
		total: string,
    perPage: string,
    currentPage: string,
    lastPage: string,
    firstPage: string,
    firstPageUrl: string,
    lastPageUrl: string,
    nextPageUrl: string,
    previousPageUrl: string,
	}

	interface CamelCaseNamingStrategyContract extends SnakeCase {
		serializedName(_model: typeof BaseModel, propertyName: string): string
		paginationMetaKeys(): metaKeys
		/**
         * The default table name for the given model
         */
		tableName(model: LucidModel): string;
		/**
		 * The database column name for a given model attribute
		 */
		columnName(model: LucidModel, attributeName: string): string;
		/**
		 * The post serialization name for a given model attribute
		 */
		serializedName(model: LucidModel, attributeName: string): string;
		/**
		 * The local key for a given model relationship
		 */
		relationLocalKey(relation: ModelRelations['__opaque_type'], model: LucidModel, relatedModel: LucidModel, relationName: string): string;
		/**
		 * The foreign key for a given model relationship
		 */
		relationForeignKey(relation: ModelRelations['__opaque_type'], model: LucidModel, relatedModel: LucidModel, relationName: string): string;
		/**
		 * Pivot table name for many to many relationship
		 */
		relationPivotTable(relation: 'manyToMany', model: LucidModel, relatedModel: LucidModel, relationName: string): string;
		/**
		 * Pivot foreign key for many to many relationship
		 */
		relationPivotForeignKey(relation: 'manyToMany', model: LucidModel, relatedModel: LucidModel, relationName: string): string;
		/**
		 * Keys for the pagination meta
		 */
		paginationMetaKeys(): metaKeys;
	}

	export const NewAppBaseModel: LucidModel
}