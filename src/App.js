import { useState } from "react"
import Header from "./components/Header/Header"
import Main from "./pages/Main/Main"
import Footer from "./components/Footer/Footer"
import styles from "./App.module.scss"
import { SidebarProvider } from "./context/ToggleSidebarContext"
import { TodoListActiveProvider } from "./context/TodoListActiveContext"
import { AddModalTodoListProvider } from "./context/AddModalTodoListContext"
import { WindowProvider } from "./context/WindowContext.js"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <WindowProvider>
      <TodoListActiveProvider>
        <SidebarProvider>
          <AddModalTodoListProvider>
            <div
              className={`d-flex flex-column ${styles.appContainer}`}
              onClick={() => {
                if (isMenuOpen) {
                  setIsMenuOpen(false)
                }
              }}
            >
              <Header />
              <Main isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              <Footer />
            </div>
          </AddModalTodoListProvider>
        </SidebarProvider>
      </TodoListActiveProvider>
    </WindowProvider>
  )
}

export default App
