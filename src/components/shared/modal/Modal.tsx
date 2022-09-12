import { FaCheck } from 'react-icons/fa'
import { IoWarningOutline, IoInformation, IoCloseCircleSharp, IoClose } from 'react-icons/io5'

// Types
import { IModal } from '../../../interfaces/modal.interface'

import styles from './Modal.module.scss'

export default function Modal({
  type = 'success',
  title = '',
  children = '',
  open = false,
  onClose,
  actions = []
}: IModal) {
  const handleAction = (action: (() => void) | undefined) => {
    if (action) action()
    if (onClose) onClose()
  }
  return (
    <>
      {open && <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div
            className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <div className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className={`
                    mx-auto flex-shrink-0 flex items-center justify-center
                    rounded-full sm:mx-0 sm:h-10 sm:w-10 h-12 w-12
                    ${type === 'success' && 'bg-green-200'}
                    ${type === 'warning' && 'bg-yellow-200'}
                    ${type === 'info' && 'bg-blue-200'}
                    ${type === 'error' && 'bg-red-200'}`}>
                    {type === 'success' && <FaCheck size={30} />}
                    {type === 'warning' && <IoWarningOutline size={30} />}
                    {type === 'info' && <IoInformation size={30} />}
                    {type === 'error' && <IoClose size={30} />}
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                      {title}
                      <IoCloseCircleSharp size='30px'
                        className={`${styles.closeBtn} drop-shadow-lg`}
                        onClick={onClose} />
                    </h3>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        {children}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                {actions.map((action, i) => (
                  <div key={i}>
                    {!action.type || action.type === 'default'
                      ? <button
                        type='button' onClick={() => handleAction(action.action)}
                        className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
                        {action.label}
                      </button>
                      : <button
                        type='button' onClick={() => handleAction(action.action)}
                        className={`
                            w-full inline-flex justify-center rounded-md border border-transparent
                            shadow-sm px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm font-medium
                            text-base focus:outline-none focus:ring-2 focus:ring-offset-2
                            ${action.type === 'success' && 'hover:bg-green-700 focus:ring-green-500 bg-green-600 text-white'}
                            ${action.type === 'warning' && 'hover:bg-yellow-700 focus:ring-yellow-500 bg-yellow-600 text-white'}
                            ${action.type === 'info' && 'hover:bg-blue-700 focus:ring-blue-500 bg-blue-600 text-white'}
                            ${action.type === 'error' && 'hover:bg-red-700 focus:ring-red-500 bg-red-600 text-white'}
                          `}>
                        {action.label}
                      </button>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
