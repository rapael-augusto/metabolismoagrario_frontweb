export default interface inputDefaultType {
    classe: string
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    placeholder: string
    type: string
}