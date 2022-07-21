import React from "react"
import Quiz from "./Quiz/Quiz"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import styles from "./quizes.module.css"
import {
  Paper,
  CircularProgress,
} from "@material-ui/core"
import useStyles from "./styles"
import Pagination from "../Pagination/Pagination"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Quizes() {
  const classes = useStyles()
  const { quizes, isLoading } = useSelector((state) => state.quiz)

  const query = useQuery()
  const page = query.get("page") || 1

  return (
    <div className={styles["quizes-list"]}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        quizes.map((quiz) => <Quiz key={quiz._id} quiz={quiz} />)
      )}
      <Paper className={classes.pagination} elevation={6}>
        <Pagination page={page} />
      </Paper>
    </div>
  )
}

export default Quizes
