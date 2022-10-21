import { Validator, RequiredValidator } from '@/application/validation'
import { CompareFieldsValidation } from './compare-fields-validation'
import { StringValidator } from './string'
import { NumberValidator } from './number'

export class ValidationBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: {value: string, fieldName: string}): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredValidator(this.value, this.fieldName))
    return this
  }

  string (): ValidationBuilder {
    this.validators.push(new StringValidator(this.value, this.fieldName))
    return this
  }

  number (): ValidationBuilder {
    this.validators.push(new NumberValidator(this.value, this.fieldName))
    return this
  }

  validateCompareFields (fieldNameToCompare: string): ValidationBuilder {
    this.validators.push(new CompareFieldsValidation(this.value, this.fieldName, fieldNameToCompare))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
