import React, { createContext, useState } from "react"

export const ToggleSidebardContext = createContext()

export const SidebarProvider = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false)

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive)
  }

  return (
    <ToggleSidebardContext.Provider value={{ sidebarActive, toggleSidebar }}>
      {children}
    </ToggleSidebardContext.Provider>
  )
}
