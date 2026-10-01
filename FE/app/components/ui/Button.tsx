'use client'

import React from 'react'

type ButtonVariant = 'red' | 'blue' | 'ghost' | 'red-muted'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  loadingText?: string
  children: React.ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  red: {
    background: 'linear-gradient(180deg, #bd001f 0%, #a9001e 62%, #910014 100%)',
    color: '#ffffff',
    boxShadow: '0 0 18px rgba(255, 0, 43, 0.86), 0 0 42px rgba(190, 0, 35, 0.56), inset 0 -3px 0 rgba(255, 36, 62, 0.45)',
  },
  blue: {
    background: 'linear-gradient(180deg, #252aa7 0%, #202193 62%, #17146f 100%)',
    color: '#ffffff',
    boxShadow: '0 0 18px rgba(55, 64, 255, 0.82), 0 0 42px rgba(44, 44, 210, 0.5), inset 0 -3px 0 rgba(66, 75, 255, 0.36)',
  },
  ghost: {
    background: 'transparent',
    color: '#ffffff',
    boxShadow: 'none',
  },
  'red-muted': {
    /* Dark navy disabled style matching user image media_1790164013636.png */
    background: 'linear-gradient(180deg, #181944 0%, #101132 100%)',
    color: 'rgba(215, 218, 245, 0.65)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 0 12px rgba(10, 10, 40, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
  },
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: '8px 16px',
    fontSize: '12px',
    borderRadius: '12px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    minHeight: '40px',
  },
  md: {
    padding: '12px 20px',
    fontSize: '14px',
    borderRadius: '14px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    minHeight: '48px',
  },
  lg: {
    padding: 'clamp(14px, 1.8dvh, 32px) clamp(10px, 1.2vw, 24px)',
    fontSize: 'clamp(14px, 1.85dvh, 34px)',
    borderRadius: 'clamp(16px, 1.6dvh, 28px)',
    fontWeight: 800,
    letterSpacing: '0.035em',
    minHeight: 'clamp(52px, 6.2dvh, 116px)',
  },
}

export function Button({
  variant = 'blue',
  size = 'lg',
  loading = false,
  loadingText,
  children,
  fullWidth = true,
  style,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        fontFamily: 'var(--font-body)',
        textTransform: 'uppercase',
        width: fullWidth ? '100%' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(6px, 0.8vw, 14px)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        textShadow: variant === 'red-muted' ? '0 0 8px rgba(255,255,255,0.3)' : '0 0 14px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.45)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled && !loading ? 0.9 : 1,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        ...style,
      }}
      className={`zyn-btn ${className}`}
      {...props}
    >
      {loading && (
        <svg
          width="1.2em"
          height="1.2em"
          viewBox="0 0 32 32"
          fill="none"
          style={{ animation: 'spin 1.1s linear infinite', flexShrink: 0 }}
          aria-hidden="true"
        >
          <path
            d="M24.8 10.2A10.6 10.6 0 0 0 6.6 8.1L4.5 10.2"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 4.5v5.7h5.7"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.2 21.8a10.6 10.6 0 0 0 18.2 2.1l2.1-2.1"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27.5 27.5v-5.7h-5.7"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span>{loading && loadingText ? loadingText : children}</span>
    </button>
  )
}
