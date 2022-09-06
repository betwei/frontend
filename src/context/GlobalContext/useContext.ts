import { useContext, useState } from "react";

// Context
import GlobalContext from ".";

// Types
import { IModal } from "../../interfaces/modal.interface";

export const useGlobalContext = () => {
  const [modal, setModal] = useState({} as IModal);
  const [loader, setLoader] = useState(false);

  return {
    modal,
    setModal,
    loader,
    setLoader,
  };
};

export const useGetGlobalContext = () => useContext(GlobalContext);
