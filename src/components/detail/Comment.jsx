import React from "react";
import styled from "styled-components";

import CommentItem from "./CommentItem";

const Comment = ({commentLists}) => {
  return (
    <>
      <StCommentList>
        {commentLists.map((a) => (
          <StCommentItem key={a.id}>
            <CommentItem {...a} />
          </StCommentItem>
        ))}
      </StCommentList>
    </>
  )
}

const StCommentList = styled.ul`
  list-style: none;
  flex: 1;
  overflow: auto;
`

const StCommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  
  & .textArea {
    width: 85%;
    & p {
      word-break: break-all;
    }


    & .nickName {
      margin-bottom: 5px;
    }

    & .desc {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
  
  & .buttonArea {
    display: flex;
    flex-direction: column;
  }

  &:first-child {
    margin-top: 0;
  }

  & .date {
    font-size: 14px;
    color: #777;
  }

  & .heart {
    margin-right: 10px;
  }
`

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

export default Comment