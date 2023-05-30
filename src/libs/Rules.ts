import { IValidationParameter } from './contracts/IValidationParameter'

export enum RULES {
  REQUIRED = 'REQUIRED',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  PASSWORD_MIN_LENGTH = 'PASSWORD_MIN_LENGTH',
  IDENTICAL = 'IDENTICAL'
}

export const validateNotEmpty = (params: IValidationParameter): boolean => {
  return params.value !== '' && typeof params.value !== 'undefined'
}

export const validateEmail = (params: IValidationParameter): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.value)
}

export const validatePasswordLength = (
  params: IValidationParameter
): boolean => {
  const min = params.min || 0
  return params.value.length >= Number(min)
}

export const validateIdentical = (params: IValidationParameter): boolean => {
  const othervalue = params.othervalue || ''
  return params.value === othervalue
}
