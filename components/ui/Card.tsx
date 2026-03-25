import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  lift?: boolean
}

export default function Card({ children, className = '', lift = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#F5E6E0] shadow-sm overflow-hidden ${
        lift ? 'card-lift' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
