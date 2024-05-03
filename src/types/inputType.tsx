export default interface inputDefaultType {
    classe: string
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string | number
    placeholder: string
    type: string
    step?: string 
}