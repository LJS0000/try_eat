import React from "react";

//package
import styled from "styled-components";

//assets
import placeholder from '../src_assets/placeholder.png'


const Post = () => {
  return (
    <StPostBox>
      <StPostImg src={placeholder} alt='사진 업로드'/>
      <button>사진 업로드</button>
      <StPostContent>
        <h3>음식 이름: 떡볶이</h3>
        <h3>식당 이름: 웃긴 떡볶이</h3>
        <h3>식당 위치: 서대문</h3>
        <h3>후기: 둘이 먹다 하나가 죽으면 알아차릴 맛입니다.</h3>
        <h3>별점: ★★★☆☆</h3>
      </StPostContent>
      <button>수정하기</button>
    </StPostBox>
  )
}

export default Post

const StPostBox = styled.div`
width: 700px;
display: flex;
flex-direction: column;
align-items: center;
margin: 50px auto;
`

const StPostImg = styled.img`
width: 300px;
margin: 10px;
`

const StPostContent = styled.div`
width: 450px;
height: 200px;
border: 1px solid black;
margin: 10px;
`