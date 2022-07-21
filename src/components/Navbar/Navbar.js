import React, { useState, useEffect } from "react"
import styles from "./navbar.module.css"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import decode from "jwt-decode"
import * as actionType from "../../constants/actionTypes"
import logo from "../../assets/logo.png"

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const socket = useSelector((state) => state.socket.socket)

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })
    history.push("/auth")
    setUser(null)
    socket.disconnect()
  }

  useEffect(() => {
    const token = user?.accessToken
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles["menu-right"]}>
          <ul className={styles.nav__list}>
            <li className={styles["nav__list-logo"]}>
              <Link to="/" className={styles["logo-link"]}>
                <img src={logo} alt="logo" className={styles["logo-img"]} />
              </Link>
            </li>
            <li className={styles["nav__list-item"]}>
              <Link to="/quizes" className={styles["link_decorate"]}>
                Published
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles["menu-left"]}>
          <ul className={styles.nav__list}>

            {user ? (
              <>
                <li className={styles["nav__list-item"]}>
                  <Link to="/games/joingame" className={styles["link_decorate"]}>
                    Chơi
                  </Link>
                </li>
                {user.result.userType === "Teacher" && (
                  <li className={styles["nav__list-item"]}>
                    <Link to="/myquizes" className={styles["link_decorate"]}>
                      Bảng câu hỏi
                    </Link>
                  </li>
                )}
                <li className={styles["nav__list-item"]}>
                  Xin chào, {user.result.firstName}
                </li>
                <li onClick={logout} className={styles["nav__list-item"]}>
                  Đăng xuất
                </li>
              </>
            ) : (
              <div className={styles["nav__list-item"]}>
                <Link to="/auth">
                  Đăng nhập
                </Link>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
