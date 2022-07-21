import React, { useEffect, useState } from "react"
import MyQuiz from "./MyQuiz/MyQuiz"
import { useDispatch, useSelector } from "react-redux"
import { getTeacherQuizes, createQuiz } from "../../actions/quiz"
import styles from "./myQuizes.module.css"
import { useHistory } from "react-router-dom"

function MyQuizes() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()
  const history = useHistory()
  const [quizData, setQuizData] = useState({
    name: "",
    creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 1,
    isPublic: true,
    tags: [],
    questionList: [],
  })

  const [isQuizPublic, setIsQuizPublic] = useState(true)

  useEffect(() => {
    dispatch(getTeacherQuizes(user.result._id))
  }, [dispatch])

  const { quizes } = useSelector((state) => state.quiz)

  const handleQuizSubmit = () => {
    dispatch(createQuiz(quizData, history))
  }

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles["quizes-list"]}>
      <div className={styles["quiz-settings"]}>
        <h2>Tạo mới câu hỏi</h2>
        <div className={styles["quiz-form"]}>
          <div className={styles["option-label"]}>
            <label>Tiêu đề</label>
          </div>
          <input
            value={quizData.name}
            type="text"
            name="name"
            onChange={handleQuizChange}
          />
          <div className={styles["option-label"]}>
            <label>Mô tả</label>
          </div>
          <input
            value={quizData.description}
            type="text"
            name="description"
            onChange={handleQuizChange}
          // className="form-control"
          />
          <div className={styles["option-buttons"]}>
            <button
              onClick={() => {
                setIsQuizPublic(true)
                setQuizData({ ...quizData, isPublic: true })
              }}
              className="btn btn-secondary my-3 me-2"
              style={{
                backgroundColor: isQuizPublic ? "rgb(19, 104, 206)" : "inherit",
                color: isQuizPublic ? "white" : "rgb(110, 110, 110)",
              }}
            >
              Public
            </button>
            <button
              onClick={() => {
                setIsQuizPublic(false)
                setQuizData({ ...quizData, isPublic: false })
              }}
              className="btn btn-secondary my-3"
              style={{
                backgroundColor: isQuizPublic ? "inherit" : "rgb(19, 104, 206)",
                color: isQuizPublic ? "rgb(110, 110, 110)" : "white",
              }}
            >
              Private
            </button>
          </div>
          <button
            onClick={handleQuizSubmit}
            className={styles["submit-button"]}
          >
            Tạo
          </button>
        </div>
      </div>
      {quizes.map((quiz) => (
        <MyQuiz key={quiz._id} quiz={quiz} />
      ))}
    </div>
  )
}

export default MyQuizes
