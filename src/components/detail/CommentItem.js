import React, {useEffect} from "react";
import {removeCommentList, updateCommentList} from "../../redux/modules/comment";
import {useDispatch} from "react-redux";
import {useRef, useState} from "react";
import styled from "styled-components";
import axios from "axios";

const CommentItem = ({postId, id, name, date, commentText}) => {
  const dispatch = useDispatch()
  const toggleIsEdit = () => setIsEdit(!isEdit)
  const [isEdit, setIsEdit] = useState(false)
  const [inputText, setInputText] = useState(commentText)
  const [commentTexts, setCommentTexts] = useState('')
  const [nickName, setNickName] = useState("")
  const commentTextInput = useRef()

  const onRemoveHandler = () => {
    const ids = {
      postId: postId,
      id: id,
    }
    dispatch(removeCommentList(ids))
  }

  const onChangeTextHandler = (e) => {
    setCommentTexts(e.target.value)
    setInputText(e.target.value)
  }

  const onTextSubmitHandler = () => {
    if (commentTextInput.current.value.length < 1) {
      alert("1글자 이상 입력 해주세요")
      return
    }
    const ids = {
      postId: parseInt(postId),
      id: id,
      date: new Date().toLocaleString(),
      commentText: commentTexts,
    }
    dispatch(updateCommentList(ids))
    commentTextInput.current.value = ""
  }

  const user = localStorage.getItem("user").replace(/\"/gi, "")

  const getNickName = () => {
    axios.get(`http://localhost:3001/users?email=${user}`)
      .then((res) => {
        return setNickName(res.data[0].nick)
      })
  }

  useEffect(() => {
    getNickName()
  })

  console.log(nickName)

  return (
    <>
      <div className="textArea">
        <p className={'nickName'}>{name}</p>
        {
          isEdit
            ? <input value={inputText} ref={commentTextInput} onChange={onChangeTextHandler} type="text"/>
            : <p className={"comment"}>{commentText}</p>
        }
        <p className={"desc"}><span className={"date"}>{date}</span></p>
      </div>
      {
        name===nickName ? (
          <div className="buttonArea">
            <StButton onClick={() => {
              onRemoveHandler()
            }} color={"red"}>삭제</StButton>
            {
              isEdit ? (
                  <StButton onClick={() => {
                    onTextSubmitHandler()
                    toggleIsEdit()
                  }} color={"blue"}>완료</StButton>
                ) :
                <StButton onClick={() => {
                  toggleIsEdit()
                }} color={"blue"}>수정</StButton>
            }
          </div>
        ): null
      }

    </>
  )
}

const StButton = styled.button`
  margin-bottom: 10px;
  background-color: transparent;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${props => props.color};
  border: 1px solid #c4c4c4;
  cursor: pointer;

  &:hover {
    border: 1px solid ${props => props.color};
    background-color: ${props => props.color};
    color: white;
  }
`


export default CommentItem