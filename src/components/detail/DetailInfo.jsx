import React, {Fragment, useState} from "react";
import styled from "styled-components";
import placeholder from "../../src_assets/placeholder.png";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPost} from "../../redux/modules/detail";
import {FaRegCommentAlt} from "react-icons/fa";
import axios from "axios";

const DetailInfo = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const [commentLength, setCommentLength] = useState(0)
  const [nickName, setNickName] = useState("")
  const postData = useSelector((state => state.detail))
  const comment = useSelector((state) => state.comment)
  useEffect(() => {
    dispatch(getPost(id))
  }, [])

  useEffect(() => {
    comment.length && setCommentLength(comment.length)
  }, [comment.length])


  const getNickName = () => {

    let user = localStorage.getItem("user")
    if(user===undefined || user===null) {
      alert("로그인이 필요합니다")
      navigate("/login")
    }else {
      user = user.replace(/\"/gi, "")
    }
    axios.get(`https://try-eat.herokuapp.com/users?email=${user}`)
      .then((res)=> {
        return setNickName(res.data[0].nick)
      })
  }

  useEffect(()=> {
    getNickName()
  })

  return (
    <>
      {postData.map((data) =>
        <StImageBox key={data.id} src={data.imgFile}/>
      )}
      <StImageInfo>
        <StInfoLeft>
          {postData.map((data) => (
            <Fragment key={data.id}>
              <p>{data.food}</p>
              <p>{data.restaurant}</p>
              <p>{data.location}</p>
            </Fragment>
          ))}
        </StInfoLeft>
        <StInfoRight>
          <p>{postData[0]?.name}</p>
          <p className={"commentLength"}><FaRegCommentAlt/>{commentLength}</p>
          {
            postData[0]?.name === nickName
            ? <button onClick={()=> {navigate(`/edit/${id}`)}}>수정하기</button>
              : null
          }
        </StInfoRight>
      </StImageInfo>
      {postData.map((data) => (
        <StImageDesc key={data.id}>
          {data.review}
        </StImageDesc>
      ))}
    </>
  )
}

const StImageBox = styled.img`
  background-image: url(${placeholder});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 300px;
  object-fit: fill;
`

const StImageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-top: 30px;
`

const StInfoLeft = styled.div`

  & p {
    padding: 3px 0;
    font-size: 18px;
    font-weight: bold;
  }
  & button {
    
  }
`
const StInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & p {
    padding: 3px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & svg {
      margin-right: 5px;
    }
  }

  & .commentLength {
    text-align: right;
  }
`
const StImageDesc = styled.div`
  margin-top: 30px;
  flex: 1;
  overflow: auto;
`


export default DetailInfo