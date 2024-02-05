import { PropsWithChildren, ReactNode, useContext } from 'react'
import { createContext, useMemo, useState } from 'react'

import { XModal } from '@/components/data-display'

type ModalTitleType = string | undefined

export type ModalContextProps = {
  showModal: (c: ReactNode) => void
  hideModal: () => void
  setTitle: (title: ModalTitleType) => void
}

export const ModalContext = createContext<ModalContextProps>({
  showModal: () => {},
  hideModal: () => {},
  setTitle: () => {},
})

export const useModalContext = () => useContext(ModalContext)

export type ModalProviderProps = PropsWithChildren & {}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [component, setComponent] = useState<ReactNode | undefined>()
  const [title, setTitle] = useState<ModalTitleType>()

  const showModal = (c: ReactNode) => {
    setIsOpen(true)
    setComponent(c)
  }
  const hideModal = () => {
    setIsOpen(false)
    setComponent(undefined)
  }

  const context = useMemo(() => {
    return { showModal, hideModal, setTitle }
  }, [])

  return (
    <ModalContext.Provider value={context}>
      {children}
      <XModal open={isOpen} onClose={() => hideModal()} title={title}>
        <div>{component || null}</div>
      </XModal>
    </ModalContext.Provider>
  )
}
