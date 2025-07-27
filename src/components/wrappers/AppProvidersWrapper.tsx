'use client'
import { NotificationProvider } from '@/context/useNotificationContext'
import { ThemeProvider } from '@/context/useThemeContext'
import { ChildrenType } from '@/types/component-props'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'


const AppProvidersWrapper = ({ children }: ChildrenType) => {

  useEffect(() => {
    const splashElement = document.querySelector<HTMLDivElement>('#__next_splash')
    const splashScreen = document.querySelector('#splash-screen')

    if (!splashElement || !splashScreen) return

    const handleMutations = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && splashElement.hasChildNodes()) {
          splashScreen.classList.add('remove')
        }
      }
    }
    const observer = new MutationObserver(handleMutations)
    observer.observe(splashElement, { childList: true, subtree: true })
    if (splashElement.hasChildNodes()) {
      splashScreen.classList.add('remove')
    }

    return () => observer.disconnect()
  }, [])

  return (
    // <SessionProvider>
    <ThemeProvider>
      <NotificationProvider>
        {children}
        <ToastContainer theme="colored" />
      </NotificationProvider>
    </ThemeProvider>
    // </SessionProvider>
  )
}
export default AppProvidersWrapper
