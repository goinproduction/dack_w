import React, { useState, useEffect } from "react"
import styles from "./waitingRoom.module.css"

function WaitingRoom({ pin, socket }) {
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    socket.on("player-added", (player) => {
      setPlayerList([...playerList, player])
    })
  }, [playerList, socket])

  return (
    <div className={styles["waiting-room"]}>
      <h1 className={styles["title"]}>
        {"Waiting room"}
      </h1>
      <h2 className={styles["header"]}>
        {"Show PIN to your students"
        }
        : {pin}
      </h2>
      <div className={styles["players-list"]}>
        <div className={styles["leaderboard"]}>
          <h1 className={styles["leaderboard-title"]}>
            {"Danh sách người chơi"}
          </h1>
          {playerList.length > 0 ? (
            <ol>
              {playerList.map((player) => (
                <li>
                  <mark>{player.userName}</mark>
                  <small>{"Student"}</small>
                </li>
              ))}
            </ol>
          ) : (
            <h1 className={styles["leaderboard-title"]}>
              {/* {"No Data"} */}
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default WaitingRoom
