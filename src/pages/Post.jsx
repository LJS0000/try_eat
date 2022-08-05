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
      <StPostForm>
        <StPostInput 
          id="음식이름"
          placeholder="음식 이름"
          type="text"
        />
        <StPostInput 
          id="식당이름"
          placeholder="식당 이름"
          type="text"
        />
        <StPostInput 
          id="식당위치"
          placeholder="식당 위치"
          type="text"
        />
        <textarea
          cols={43} rows={4}
          placeholder='후기'  
        />
        <StPostInput 
          id="별점"
          placeholder="별점"
          type="text"
        />
      </StPostForm>
      <button>저장</button>
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

const StPostInput = styled.input`
width: 300px;
height: 30px;
margin: 5px;
`

const StPostForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`