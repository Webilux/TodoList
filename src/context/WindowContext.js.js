// WindowContext.js
import React, { createContext, useContext, useEffect, useState } from "react"

export const WindowContext = createContext()

export function useWindowWidth() {
  return useContext(WindowContext)
}

export function WindowProvider({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <WindowContext.Provider value={windowWidth}>
      {children}
    </WindowContext.Provider>
  )
}
