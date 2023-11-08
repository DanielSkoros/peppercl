export interface IErrorProperty {
    message: string,
    type: string,
    path: string,
}

export interface IErrorInterface {
    name: string,
    message: string,
    properties: IErrorProperty
}

export interface IFormValidationResponse {
    token: string,
    error: string,
    message: any,
}

export interface IFormValidation {
    [key: string]: string
}