import React, { createContext, useContext } from 'react'

const RadioGroupContext = createContext()

export function RadioGroup({ children, value, onValueChange, className = "" }) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className={className}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export function RadioGroupItem({ value, id, className = "" }) {
  const context = useContext(RadioGroupContext)
  
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={context.value === value}
      onChange={() => context.onValueChange(value)}
      className={`w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${className}`}
    />
  )
}