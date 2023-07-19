import { useContext } from "react"
import { ToggleSidebardContext } from "../../context/ToggleSidebarContext"
import { AddModalTodoListContext } from "../../context/AddModalTodoListContext"
import styles from "./Header.module.scss"

function Header() {
  const { toggleSidebar } = useContext(ToggleSidebardContext)
  const { openModal } = useContext(AddModalTodoListContext)

  return (
    <header className={styles.header}>
      <ul className="d-flex flex-row">
        <li onClick={() => toggleSidebar()}>
          <i className="ri-menu-line"></i>
        </li>
        <li>
          <i className="ri-dashboard-fill pr-10"></i>
          Tableau de bord
        </li>
        <li>
          <i className="ri-folder-5-fill pr-10"></i>
          Collection
        </li>
      </ul>
      <ul className="d-flex flex-row">
        <li>
          <i className="ri-add-fill btn" onClick={openModal}></i>
        </li>
        <li>
          <i className="ri-search-2-line"></i>
        </li>
        <li>
          <i className="ri-notification-2-line"></i>
        </li>
        <li>
          <i className="ri-account-circle-line"></i>
        </li>
      </ul>
    </header>
  )
}

export default Header
