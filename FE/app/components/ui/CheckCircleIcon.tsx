import React from 'react'
import Image from 'next/image'

interface CheckCircleIconProps {
  size?: number
  className?: string
}

export function CheckCircleIcon({ size = 80, className = '' }: CheckCircleIconProps) {
  return (
    <Image
      src="/images/icon-success-delete.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  )
}
