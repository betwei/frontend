// Types
import { IChecker } from '../../../../interfaces/atoms/checker.interface'

import styles from './Checker.module.scss'

function Checker({ label, items, current, onChange, className }: IChecker) {
  return (
    <div className={className}>
      <h1 className='text-2xl'>
        {label}
      </h1>
      <div className={`flex space-x-1 justify-between rounded-lg bg-slate-100 p-0.5`}>
        {items.map(item => (
          <button
            key={item.label}
            className={`
            flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 hover:bg-gray-400
              ${(item.val === current) ? `${styles.checker__current} shadow` : ''}`}
            type='button'
            onClick={() => onChange(item.val)}>
            <span className={(item.val === current)
              ? 'text-slate-900'
              : 'text-slate-600'}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Checker