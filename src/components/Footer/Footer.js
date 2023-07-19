import { useContext } from "react"
import styles from "./Footer.module.scss"
import { ToggleSidebardContext } from "../../context/ToggleSidebarContext"

function Footer() {
  const { sidebarActive } = useContext(ToggleSidebardContext)

  return (
    <footer
      className={`d-flex flex-column justify-content-center align-items-center p-20 ${`${
        styles.footer
      } ${sidebarActive ? styles.sidebarActive : ""}`}`}
    >
      <span className="my-5">Copyright © 2023, tout droit réservé.</span>
      <span>
        By{" "}
        <a target="blank" href="https://webilux-dev.com">
          Webilux Développement
        </a>
      </span>
    </footer>
  )
}

export default Footer
