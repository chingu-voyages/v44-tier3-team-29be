import {
  RULES,
  validateEmail,
  validateIdentical,
  validateNotEmpty,
  validatePasswordLength
} from './Rules'
import { IAPIResponse } from './contracts/IAPIResponse'
import { IValidationParameter } from './contracts/IValidationParameter'

const errorMessages = {
  [RULES.REQUIRED]: ':field is required',
  [RULES.EMAIL]: ':field must be a correct e-mail',
  [RULES.PASSWORD_MIN_LENGTH]: ':field must be atleast :min characters',
  [RULES.IDENTICAL]: ':field must be identical to :otherfield',
  [RULES.PASSWORD]: ':field is required'
}

const ruleBindings = {
  [RULES.REQUIRED]: validateNotEmpty,
  [RULES.EMAIL]: validateEmail,
  [RULES.PASSWORD]: validateNotEmpty,
  [RULES.PASSWORD_MIN_LENGTH]: validatePasswordLength,
  [RULES.IDENTICAL]: validateIdentical
}

export const validate = (
  field: string,
  rule: RULES,
  targetParams: IValidationParameter
): IAPIResponse => {
  let messageResponse = ''
  let successResponse = true

  //call binds
  if (!ruleBindings[rule](targetParams)) {
    messageResponse = errorMessages[rule]
      .replace(':field', field)
      .replace(':otherfield', targetParams.otherfield || '')
      .replace(':min', targetParams.min || '')
      .replace(':max', targetParams.max || '')

    successResponse = false
  }

  return {
    message: messageResponse,
    success: successResponse
  }
}
