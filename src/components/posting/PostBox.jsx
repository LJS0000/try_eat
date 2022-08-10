import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import placeholder from '../../src_assets/placeholder.png'
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getPosts } from "../../redux/modules/postSlice";



const PostBox = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allInput = useRef();
  const [visible, setVisible] = useState(true)


  // id ~~???
  const {id} = useParams();
 
  useEffect(()=> {
    dispatch(getPosts(id))
  },[])

  //json-server에 post로 input 저장
  const [post, setPost] = useState()

  const onSubmitHandler = (post) => {
    if (allInput.value == null) {
      alert('🐷: 빈 칸 없이 입력해주세요')
    } else {
      axios.post("http://localhost:3001/posts", post);
      alert('저장 완료!');
      navigate('/');
    }
  };

  // const onInputHandler = (post) => {
  //   if (allInput.value !== null) {
  //     setVisible(!visible)
  //   } 
  // };  


  // 업로드한 이미지 미리보기 파일
  const [imageSrc, setImageSrc] = useState('');


  // 이미지 인코딩해서 미리보기 띄우고 저장
  const encodeFileToBase64 = async (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve)=>{
      reader.onload=()=> {
        setImageSrc(reader.result);
        setPost({
          ...post,
          imgFile: reader.result,
        })
        resolve();
      };
    });
  };


  
  return (
    <>
      <StPostBox>
        <StPostForm
          ref={allInput}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHandler(post);
          }}
        >
          <StPostImg>
              <img src={imageSrc} alt=''/>
          </StPostImg>
          <StPostInput
            id="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              const {value} = encodeFileToBase64(e.target.files[0]);
              setPost({
                ...post,
                imgFile: value,
              });
            }}
          />
          <StHelpText>
            ※ jpeg, png 파일만 가능합니다.
          </StHelpText>
          <StPostInput 
            id="food"
            placeholder="음식 이름"
            type="text"
            onChange={(e) => {
              const {value} = e.target;
              // console.log(value)
              setPost({
                ...post,
                food: value,
              });
            }}
          />
          <StPostInput 
            id="restaurant"
            placeholder="식당 이름"
            type="text"
            onChange={(e) => {
              const {value} = e.target;
              // console.log(value)
              setPost({
                ...post,
                restaurant: value,
              });
            }}
          />
          <StPostInput 
            id="location"
            placeholder="식당 위치"
            type="text"
            onChange={(e) => {
              const {value} = e.target;
              // console.log(value)
              setPost({
                ...post,
                location: value,
              });
            }}
          />
          <StTextarea
            id="review"
            placeholder='후기'
            onChange={(e) => {
              const {value} = e.target;
              // console.log(value)
              setPost({
                ...post,
                review: value,
              },{});
            }}
          />
          { visible &&
          <StVisibleText>
              🐷 빈 칸을 모두 채워주세요
          </StVisibleText>
          }
          <StBtns>
            <StPostBtn
              color="#fcafbd"
            >저장</StPostBtn>
            <StPostBtn
              color="#fcafbd"
              onClick={() => navigate("/")}
            >취소</StPostBtn>
          </StBtns>
        </StPostForm>
      </StPostBox>
    </>
  )
}

export default PostBox

const StPostBox = styled.div`
width: 700px;
display: flex;
flex-direction: column;
align-items: center;
margin: 50px auto;
`

const StPostImg = styled.div`
width: 300px;
height: 300px;
margin: 10px;
background-image: url(${placeholder});
background-size: cover;
& img{
  width: 300px;
  height: 300px;
  object-fit: cover;
}
`
const StHelpText = styled.p`
font-size: 13px;
font-weight: lighter;
color: #5c5c5c;
align-self: flex-start;
margin: -10px 0px 10px 15px;
`

const StPostInput = styled.input`
width: 300px;
height: 30px;
margin: 5px;
padding-left: 5px;
`

const StTextarea = styled.textarea`
width: 300px;
height: 150px;
padding: 5px;
`

const StPostForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`

const StBtns = styled.div`
width  : 300px;
`

const StPostBtn = styled.button`
width: 140px;
height: 40px;
margin: 10px 5px;
cursor: pointer;
background: none;
border: solid 1px;
:hover {
  color: ${props=>props.color};
}
`

const StVisibleText = styled.p`
  font-size: 15px;
  padding-top: 5px;
  color: red;
`
