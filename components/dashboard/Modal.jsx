import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const openModal = (body) => {
    setModals((prevModals) => [...prevModals, { body }]);
  };

  const closeModal = () => {
    setModals((prevModals) => prevModals.slice(0, -1));
  };

  return (
    <ModalContext.Provider
      value={{
        modals,
        openModal,
        closeModal,
      }}
    >
      {modals.map((modal, index) => (
        <div
          key={index}
          className="fixed  overflow-hidden pt-20 pb-20 max-h-full inset-0 z-40 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 "
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          <div className="w-max rounded-md bg-primary overflow-auto max-h-full sm:min-w-[400px] md:min-w-[500px]">
            <div className="p-2" onClick={(e) => e.stopPropagation()}>
              {modal.body}
            </div>
          </div>
        </div>
      ))}
      {children}
    </ModalContext.Provider>
  );
};
