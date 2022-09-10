import { useMemo } from 'react'

// Utils
import formatNumber from '../../../utils/formatNumber'

function FormatNumber({ number }: { number?: string }) {
  const num = useMemo(
    () => formatNumber(parseInt(number || '0')),
    [number])

  return (
    <>
      <span className='opacity-5'>
        {num.slice(0, num.lastIndexOf('X') + 1)}
      </span>
      <span>
        {num.slice(num.lastIndexOf('X') + 1)}
      </span>
    </>
  )
}

export default FormatNumber
