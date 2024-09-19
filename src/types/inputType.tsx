export default interface inputDefaultType {
    classe: string
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string | number | null
    placeholder: string
    type: string
    step?: string 
    onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
}