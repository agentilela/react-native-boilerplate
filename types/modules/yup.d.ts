declare const yup: Yup

declare module 'yup' {
  export = yup
}

interface StringSchema extends Schema {
  email(message?: string): StringSchema
  ensure(): StringSchema
  equalTo(ref: number | Ref, message?: string): StringSchema
  lowercase(message?: string): StringSchema
  matches(regex: RegExp, message?: string): StringSchema
  max(limit: number | Ref, message?: string): StringSchema
  min(limit: number | Ref, message?: string): StringSchema
  phone(message?: string): StringSchema
  required(message?: string): StringSchema
  trim(message?: string): StringSchema
  uppercase(message?: string): StringSchema
  url(message?: string): StringSchema
}

interface Yup {
  reach(schema: Schema, path: string, value?: {}, context?: {}): Schema

  addMethod(schemaType: {}, name: string, method: () => Schema): void

  ref(path: string, options?: { contextPrefix: string }): Ref

  lazy(fn: (value: {}) => Schema): Lazy

  mixed(): Schema

  string(): StringSchema

  number(): NumberSchema

  boolean(): BooleanSchema

  date(): DateSchema

  array(): ArraySchema

  object(): ObjectSchema
}

interface ValidationError {
  errors: string | string[]

  value: {}

  path: string

  inner?: ValidationError[]
}

interface Ref {}

interface Lazy {}

interface Schema {
  clone(): Schema

  label(label: string): Schema

  meta(metadata: {}): Schema

  describe(): SchemaDescription

  concat(schema: Schema): Schema

  validate(value: {}, options?: ValidateOptions, callback?: () => void): Promise<boolean>

  validateSync(value: {}, options?: ValidateOptions, callback?: () => void): boolean

  isValid(value: {}, options?: {}, callback?: () => void): Promise<{}>

  cast(value: {}): {}

  isType(value: {}): boolean

  strict(isStrict: boolean): Schema

  strip(stripField: boolean): Schema

  withMutation(builder: (current: Schema) => void): void

  default(value: {}): Schema

  default(): {}

  nullable(isNullable: boolean): Schema

  required(message?: string): Schema

  typeError(message?: string): Schema

  oneOf(arrayOfValues: Array<{}>, message?: string): Schema

  equals(arrayOfValues: Array<{}>, message?: string): Schema

  notOneOf(arrayOfValues: Array<{}>, message?: string): Schema

  when(keys: string | string[], builder: {} | ((value: {}, schema: Schema) => Schema)): Schema

  test(name: string, message: string, test: Function, callbackStyleAsync?: boolean): Schema

  test(options: {
    name: string
    exclusive: boolean
    message?: string
    params: {
      reference?: string
    }
    resolve?: (ref?: {}) => string
    test(value: {}): boolean
  }): Schema

  transform(transformation: (currentValue: {}, originalValue: {}) => {}): Schema
}

interface NumberSchema extends Schema {
  min(limit: number | Ref, message?: string): NumberSchema

  max(limit: number | Ref, message?: string): NumberSchema

  positive(message?: string): NumberSchema

  negative(message?: string): NumberSchema

  integer(message?: string): NumberSchema

  truncate(): NumberSchema

  round(type: 'floor' | 'ceil' | 'trunc' | 'round'): NumberSchema
}

interface BooleanSchema extends Schema {}

interface DateSchema extends Schema {
  min(limit: Date | string | Ref, message?: string): DateSchema

  max(limit: Date | string | Ref, message?: string): DateSchema
}

interface ArraySchema extends Schema {
  of(type: Schema): ArraySchema

  required(message?: string): ArraySchema

  min(limit: number | Ref, message?: string): ArraySchema

  max(limit: number | Ref, message?: string): ArraySchema

  ensure(): ArraySchema

  compact(rejector: (value: {}) => boolean): ArraySchema
}

interface ObjectSchema extends Schema {
  shape(fields: {}, noSortEdges?: Array<[string, string]>): ObjectSchema

  from(fromKey: string, toKey: string, alias: boolean): ObjectSchema

  noUnknown(onlyKnownKeys: boolean, message?: string): ObjectSchema

  camelCase(): ObjectSchema

  constantCase(): ObjectSchema
}

interface ValidateOptions {}

interface SchemaDescription {
  type: string
  label: string
  meta: object
  tests: string[]
}
