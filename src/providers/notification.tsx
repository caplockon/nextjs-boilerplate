import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'

type NotificationContextType = {
  pushNotification: (item: NotificationItem) => void
}

const NotificationContext = createContext<NotificationContextType>({
  pushNotification: () => {},
})

type NotificationProviderProps = PropsWithChildren & {}

export type NotificationItem = {
  key?: string
  title?: string
  message: string
  status?: 'success' | 'error' | 'warning' | 'info'
}

export const useNotificationContext = () => useContext(NotificationContext)

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notificationItems, setNotificationItems] = useState<
    NotificationItem[]
  >([])

  const pushNotification = (item: Omit<NotificationItem, 'key'>) => {
    const displayedItem: NotificationItem = {
      ...item,
      key: v4(),
    }
    setNotificationItems([...notificationItems, displayedItem])
  }

  const activeNotificationIds = notificationItems
    .map((item) => item.key)
    .join(',')

  useEffect(() => {
    if (activeNotificationIds.length > 0) {
      const timer = setTimeout(() => {
        setNotificationItems(
          notificationItems.slice(0, notificationItems.length - 1)
        )
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [activeNotificationIds])

  const context = useMemo(() => {
    return { pushNotification }
  }, [])

  return (
    <NotificationContext.Provider value={context}>
      {children}
      <div className="fixed bottom-1 right-1 z-30 w-96">
        {notificationItems.map((notification) => (
          <div
            key={notification.message}
            className="w-full rounded border bg-white px-4 py-2 shadow-lg"
          >
            {notification.title && <div>{notification.title}</div>}
            {notification.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}
