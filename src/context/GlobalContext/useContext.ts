import { useContext, useState } from 'react'

// Context
import GlobalContext from '.'

// Types
import { IModal } from '../../interfaces/modal.interface'

export const useGlobalContext = () => {
  const [modal, setModal] = useState({} as IModal)

  return {
    modal, setModal
  }
}

export const useGetGlobalContext = () => useContext(GlobalContext)