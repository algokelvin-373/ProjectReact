import React from 'react'

export function Button({ children, onClick, className = "", disabled = false, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}