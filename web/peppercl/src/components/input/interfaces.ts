export interface InputProps {
  name: string
  type?: string
  icon?: string | null
  label?: string
  invalidResponse?: string
}

export interface IInput extends InputProps {
  value?: string | number | object | Array<any> | boolean | null
  isFocused?: boolean
  key?: any
}
