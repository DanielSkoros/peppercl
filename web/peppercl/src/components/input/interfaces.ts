export interface InputProps {
  name: string
  type?: string
  icon?: string | null
  label?: string
}

export interface IInput extends InputProps {
  value?: string | number | object | Array<any> | boolean
  isFocused?: boolean
  key?: any
}
