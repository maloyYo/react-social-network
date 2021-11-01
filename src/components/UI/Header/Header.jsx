import React from "react"
import styles from "./Header.module.scss"
import { Link } from "react-router-dom"

let Header = ({ login, isAuth, logout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
          alt="Logo"
        />
      </div>
      <div className={styles.auth}>
        {isAuth && (
          <>
            <div>{login}</div>
            <button onClick={logout}>Log Out</button>
          </>
        )}

        {!isAuth && <Link to="/login">Login</Link>}
      </div>
    </header>
  )
}

export default Header
