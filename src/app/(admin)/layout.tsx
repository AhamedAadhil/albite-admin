'use client'
import MainLayouts from '@/components/layouts/MainLayouts'
import { ThemeSettings, useThemeContext } from '@/context/useThemeContext'
import useViewport from '@/hooks/useViewPort'
import { changeHTMLAttribute } from '@/utils/layout'
import React, { useEffect } from 'react'


type VerticalLayoutProps = {
  children?: any
}

const AdminLayout = ({ children }: VerticalLayoutProps) => {
  const { settings, updateSidebar } = useThemeContext()
  const { width } = useViewport()

  /*
   * layout defaults
   */
  useEffect(() => {
    changeHTMLAttribute('data-bs-theme', settings.theme)
  }, [settings.theme])

  useEffect(() => {
    changeHTMLAttribute('data-layout-mode', settings.layout.mode)
  }, [settings.layout.mode])

  useEffect(() => {
    changeHTMLAttribute('data-topbar-color', settings.topbar.theme)
  }, [settings.topbar.theme])

  useEffect(() => {
    changeHTMLAttribute('data-menu-color', settings.sidebar.theme)
  }, [settings.sidebar.theme])

  useEffect(() => {
    changeHTMLAttribute('data-sidenav-size', settings.sidebar.size)
  }, [settings.sidebar.size])

  useEffect(() => {
    changeHTMLAttribute('data-layout-position', settings.layout.menuPosition)
  }, [settings.layout.menuPosition])

  useEffect(() => {
    if (width < 768) {
      updateSidebar({ size: ThemeSettings.sidebar.size.full })
    } else if (width < 1140) {
      updateSidebar({ size: ThemeSettings.sidebar.size.condensed })
    } else if (width >= 1140) {
      updateSidebar({ size: ThemeSettings.sidebar.size.default })
    }
  }, [width])
  return (
    <MainLayouts >
      {children}
    </MainLayouts>
  )
}

export default AdminLayout