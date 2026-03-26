import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variantClasses = {
    primary: 'btn-primary text-white font-medium rounded-full',
    secondary: 'btn-secondary font-medium rounded-full bg-transparent',
    ghost:
      'text-[#4A1A6B] hover:text-[#C9A84C] hover:bg-[#E4D0F5] font-medium rounded-full transition-colors',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 tracking-wide transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
