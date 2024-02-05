import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type NotificationContextType = {
  pushNotification: (item: NotificationItem) => void
}

const NotificationContext = createContext<NotificationContextType>({
  pushNotification: () => {},
})

type NotificationProviderProps = PropsWithChildren & {}

export type NotificationItem = {
  title?: string
  message: string
  status?: 'success' | 'error' | 'warning' | 'info'
}

export type DisplayedNotificationItem = NotificationItem & {
  initialAt: Date
}

export const useNotificationContext = () => useContext(NotificationContext)

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notificationItems, setNotificationItems] = useState<
    DisplayedNotificationItem[]
  >([])

  const pushNotification = (item: NotificationItem) => {
    const displayedItem: DisplayedNotificationItem = {
      ...item,
      initialAt: new Date(),
    }
    setNotificationItems([displayedItem])
  }

  useEffect(() => {
    setInterval(() => {
      setNotificationItems(
        notificationItems.filter((item) => {
          const time = new Date().getTime() - item.initialAt.getTime()
          console.log(time)
          return time < 10000
        })
      )
    }, 500)
  }, [])

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
