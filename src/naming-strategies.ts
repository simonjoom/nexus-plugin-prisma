import camelCase from 'camelcase'
import pluralize from 'pluralize'
import { type InternalDMMF } from './dmmf/index.js'
import { upperFirst } from './utils.js'

export interface ArgsNamingStrategy {
  whereInput: (typeName: string, fieldName: string) => string
  orderByInput: (typeName: string, fieldName: string) => string
  relationFilterInput: (typeName: string, fieldName: string) => string
}

export const defaultArgsNamingStrategy: ArgsNamingStrategy = {
  whereInput(typeName, fieldName) {
    return `${upperFirst(typeName)}${upperFirst(fieldName)}WhereInput`
  },
  orderByInput(typeName, fieldName) {
    return `${upperFirst(typeName)}${upperFirst(fieldName)}OrderByWithRelationInput`
  },
  relationFilterInput(typeName, fieldName) {
    return `${upperFirst(typeName)}${upperFirst(fieldName)}Filter`
  },
}

export type OperationName = Exclude<keyof InternalDMMF.Mapping, 'model' | 'plural'>

export type FieldNamingStrategy = Record<OperationName, (fieldName: string, modelName: string) => string>

export const defaultFieldNamingStrategy: FieldNamingStrategy = {
 // findUnique: (_, modelName) => camelCase(modelName),
 // findMany: (_, modelName) => camelCase(pluralize(modelName)),   
   findUnique: (_, modelName) => `findUnique${modelName}`,
  findMany: (_, modelName) =>  `findMany${modelName}`,
  create: (fieldName) => fieldName,
  update: (fieldName) => fieldName,
  delete: (fieldName) => fieldName,
  deleteMany: (fieldName) => fieldName,
  updateMany: (fieldName) => fieldName,
  upsert: (fieldName) => fieldName,
}
