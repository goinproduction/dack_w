import React, { useState, useRef } from "react"
import { Typography, TextField, Button } from "@material-ui/core/"
import { useDispatch } from "react-redux"

import { commentQuiz } from "../../../actions/quiz"
import useStyles from "./styles"

const CommentSection = ({ quiz }) => {
  const user = JSON.parse(localStorage.getItem("profile"))
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()
  const [comments, setComments] = useState(quiz?.comments)
  const classes = useStyles()
  const commentsRef = useRef()

  const handleComment = async () => {
    const newComments = await dispatch(
      commentQuiz(`${user?.result?.userName}: ${comment}`, quiz._id)
    )

    setComment("")
    setComments(newComments)

    commentsRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            {"Comments"}
          </Typography>
          {comments?.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(": ")[0]}</strong>
              {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.userName && (
          <div style={{ width: "70%" }}>
            {/* <Typography gutterBottom variant="h6">
              {"Write a comment"}
            </Typography> */}
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              {"Comment"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection
