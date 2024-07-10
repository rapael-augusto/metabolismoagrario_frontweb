import React, { useState } from "react";
import "../../styles/layout/select.css"

interface SelectProps {
  label?: string
  type: "form" | "filter"
  placeholder?: string;
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

const Select: React.FC<SelectProps> = ({ label, options, onChange, placeholder, type }) => {
  const [selectedValue, setSelectedValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedValue(value)
    onChange(value)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }


  return (

    <div className={`${type}-select`}>

      <label className="select-label" htmlFor="select">{label}</label>

      <select value={selectedValue} onChange={handleChange}>

        <option hidden value="empty">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </select>

    </div>
  )
}

export default Select
