// Context
import { useGetGlobalContext } from '../../context/GlobalContext/useContext'

// Types
import { IModal } from '../../interfaces/modal.interface'

export const useShowModal = (m: IModal) => {
  const { modal, setModal } = useGetGlobalContext()

  return () => setModal({
    ...m,
    open: true,
    onClose: () => setModal({ ...modal, open: false })
  })
}
