import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import CommonHeader from "../components/CommonHeader";
import "./signup.css"

const Login = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })

  const {email, password} = inputs
  const onChange = (e) => {
    const {value, name} = e.target
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const onLoginHandler = async () => {
    await axios.post("http://try-eat.herokuapp.com/login", {
      ...inputs
    }).then((res)=> {
      console.log(res.data)
      localStorage.setItem("user", JSON.stringify(res.data.user.email))
      localStorage.setItem("token", JSON.stringify(res.data.accessToken))
      navigate("/")
    }).catch((res)=> {
      console.log(res)

      if(res.response.data === "Email and password are required") {
        alert("이메일과 비밀번호를 다시 확인해주세요.")
        return;
      }
      
      if(res.response.data === "Email format is invalid") {
        alert("유효하지 않은 이메일 형식입니다.")
        return;
      }

      if (res.response.data === "Cannot find user") {
        alert("등록되지 않은 계정입니다.")
        return
      }

      if (res.response.data === "Incorrect password") {
        alert("잘못된 비밀번호입니다.")
        return
      }

      if (res.response.data === "Password is too short") {
        alert("잘못된 비밀번호입니다.")
        return
      }
    })
  }

  return (
    <div className={"auth-wrapper"}>
      <div className="auth-inner">
      <h1>로그인</h1>
      <div>
        <input name={"email"} value={email} type="text" onChange={onChange} placeholder={"이메일"}/>
      </div>
      <div>
        <input name={"password"} value={password} type="text" onChange={onChange} placeholder={"비밀번호"}/>
      </div>
      <button className={"btn2"} onClick={onLoginHandler}>로그인</button>
      <button className={"btn2"} onClick={()=> {
        navigate("/signup")
      }}>회원가입</button>
      </div>
    </div>
  )
}

export default Login