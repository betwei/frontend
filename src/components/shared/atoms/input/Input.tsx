// Types
import { useEffect, useRef, useState } from 'react'
import { IInput } from '../../../../interfaces/atoms/input.interface'

import styles from './Input.module.scss'

function Input({
  className,
  type,
  label,
  placeholder,
  value,
  onChange,
  alias,
  error,
  disabled
}: IInput) {
  const [width, setWidth] = useState('1px')
  const refI = useRef()
  const refB = useRef()
  const refDiv = useRef()
  const refSpan = useRef()

  useEffect(() => {
    const wB = refB.current ? (refB.current as any).offsetWidth : 0
    const wDiv = refDiv.current ? (refDiv.current as any).offsetWidth : 0
    const wSpan = refSpan.current ? (refSpan.current as any).offsetWidth : 0
    if (wB <= (wDiv - wSpan))
      setWidth(`${refB.current ? (
        wB === (wDiv - wSpan)
          ? (refB.current as any).offsetWidth - 40
          : (refB.current as any).offsetWidth) || 1 : 1}px`)
  }, [value])
  return (
    <div
      className={`
        col-span-6 sm:col-span-3
        ${styles.input} ${className}
        ${disabled && 'opacity-70'}`}
      onClick={() => !disabled && (refI?.current as any)?.focus()}
      title={value}>
      <label htmlFor='first-name' className='block text-sm font-medium text-left truncate'>
        {label}
      </label>
      <div ref={refDiv as any} className='mt-1 block w-full shadow-sm sm:text-sm'>
        <b ref={refB as any}>
          {value}
        </b>
        <input
          type={type || 'text'}
          ref={refI as any}
          placeholder={placeholder}
          value={value}
          style={{ width }}
          disabled={disabled}
          onChange={(e) => !disabled && onChange && onChange(
            e.target.value
          )} />
        <span ref={refSpan as any}>{alias}</span>
      </div>
      {error && error.trim() !== '' &&
        <i>{error}</i>}
    </div>
  )
}

export default Input