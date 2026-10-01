import React from 'react'
import Image from 'next/image'

interface TrashIconProps {
  size?: number
  className?: string
}

export function TrashIcon({ size = 80, className = '' }: TrashIconProps) {
  return (
    <Image
      src="/images/icon-trash.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  )
}
