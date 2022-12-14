import * as React from "react";
import styled from "styled-components";
import {useState, useEffect} from "react";
import axios from "axios";
import placeholder from "../../src_assets/placeholder.png";
import {useNavigate} from "react-router-dom";

const MyPageBox = () => {

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("")


  const getNickName = () => {

    let user = localStorage.getItem("user")
    if(user===undefined || user===null) {
      navigate("/login")
    }else {
      user = user.replace(/\"/gi, "")
    }
    axios.get(`https://try-eat.herokuapp.com/users?email=${user}`)
      .then((res)=> {
        return setNickName(res.data[0].nick)
      })
  }


  useEffect(() => {
    getNickName()
  }, [])

  const fetchPosts = async () => {
    const {data} = await axios.get('https://try-eat.herokuapp.com/posts');
    setPosts(data);
  };


  useEffect(() => {
    fetchPosts()
  }, []);


  return (
    <>
      <MainBoxContainer>
        {window.location.pathname === "/mypage"
          ? posts.filter((post) => post.name === nickName)
            ?.map((post, idx) => (
              <MainBoxLayout key={post.id} onClick={() => {
                navigate(`/detail/${post.id}`);
              }}>
                <StMainBox>
                  <StPostImg>
                    <img src={post.imgFile} alt='이미지 없어용'/>
                  </StPostImg>
                  <StPostHover>
                    <div className="hoverText">
                      <p>음식명 : {post.food}</p>
                      <p>가게명 : {post.restaurant}</p>
                      <p>가게 위치: {post.location}</p>
                    </div>
                  </StPostHover>
                </StMainBox>
                <p>{post.name}</p>
              </MainBoxLayout>
            )).reverse()
          :
          posts?.map((post, idx) => (
            <MainBoxLayout key={post.id} onClick={() => {
              navigate(`/detail/${post.id}`);
            }}>
              <StMainBox>
                <StPostImg>
                  <img src={post.imgFile} alt='이미지 없어용'/>
                </StPostImg>
                <StPostHover>
                  <div className="hoverText">
                    <p>음식명 : {post.food}</p>
                    <p>가게명 : {post.restaurant}</p>
                    <p>가게 위치: {post.location}</p>
                  </div>
                </StPostHover>
              </StMainBox>
              <p>{post.name}</p>
            </MainBoxLayout>
          )).reverse()}

        {/* {posts.filter((post) => post.name === nickName)
    ?.map((post, idx) => (
        <MainBoxLayout key={post.id} onClick={()=> {
            navigate(`/detail/${post.id}`);
        }}>
            <StMainBox>
            <StPostImg>
                <img src={post.imgFile} alt='이미지 없어용' />
            </StPostImg>
            <StPostHover>
                <div className="hoverText">
                    <p>음식명 : {post.food}</p>
                    <p>가게명 : {post.restaurant}</p>
                    <p>가게 위치: {post.location}</p>
                </div>
                </StPostHover>
            </StMainBox>
            <p>{post.name}</p>  
        </MainBoxLayout>
    )).reverse()} */}


      </MainBoxContainer>
    </>
  )

}

const MainBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const MainBoxLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  width: 33%;
  cursor: pointer;

  & > p {
    /* flex: 1 1 100%; */
    margin-top: 7px;
    width: 220px;
  }
`;

const StMainBox = styled.div`
  width: 220px;
  height: 200px;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
`;


const StPostImg = styled.div`
  background-image: url(${placeholder});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`


const StPostHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(255, 255, 255, 0.8);
  font-weight: 700;
  font-size: 15px;

  &:hover {
    opacity: 1;
  }

  & .hoverText {
    padding: 30px;

    & p {
      margin: 10px 0;
    }
  }
`

export default MyPageBox;