import React from "react";

class TestSignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      nickname: "",
      pw: "",
      re_pw: "",
      emailCheck: "",
      nicknameCheck: "",
      pwCheck: ""
    };
  }

  //이메일 인풋창 핸들링
  handleEmail = e => {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  };

  //이메일 중복 검사
  checkEmail = e => {
    e.preventDefault();

    //이메일 유효성 검사 
    const chkEmail = function (str) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(str) ? true : false;
    };

    const inputEmail = {
      email: this.state.email
    };
    const email_info = {
      method: "POST",
      body: JSON.stringify(inputEmail),
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (chkEmail(this.state.email) === false) {
      alert("이메일 형식이 유효하지 않습니다.");
      this.setState({
        email: ""
      });
    } else {
      fetch("https://try-eat.herokuapp.com/users/email", email_info)
        .then(res => res.json())
        .then(json => {
          if (json === true) {
            alert("사용 가능한 이메일입니다.");
            this.setState({
              emailCheck: this.state.email
            });
          } else {
            console.log(json)
            alert("이미 존재하는 이메일입니다.");
          }
        });
    }
  };

  //닉네임 인풋창 핸들링
  handleNickname = e => {
    e.preventDefault();
    this.setState({
      nickname: e.target.value
    });
  };

  //닉네임 중복 검사
  checkNickname = e => {
    e.preventDefault();

    const chkNickname = function (str) {
      var regNm = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}$/;
      return regNm.test(str) ? true : false;
    };

    const inputNickname = {
      nickname: this.state.nickname
    };

    const nickname_info = {
      method: "POST",
      body: JSON.stringify(inputNickname),
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (chkNickname(this.state.nickname) === false) {
      alert("한글, 영문 대소문자 2~15자리만 사용 가능합니다");
    } else {
      fetch("https://try-eat.herokuapp.com/users/nick", nickname_info)
        .then(res => res.json())
        .then(json => {
          if (json === true) {
            alert("사용 가능한 닉네임입니다.");
            this.setState({
              nicknameCheck: this.state.nickname
            });
          } else {
            alert("이미 존재하는 닉네임입니다.");
          }
        });
    }
  };

  //첫번째 패스워드 입력창 set변환
  handlePW = e => {
    e.preventDefault();
    this.setState({
      pw: e.target.value
    });
  };

  //두번째 패스워드 입력창 set변환
  handleRE_PW = e => {
    e.preventDefault();
    this.setState({
      re_pw: e.target.value
    });
  };

  //첫번째 두번째 패스워드 일치 확인
  checkPW = e => {
    e.preventDefault();

    //비밀번호 유효성 검사(영문, 숫자 혼합 6~20)
    const chkPwd = function (str) {
      var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return !reg_pwd.test(str) ? false : true;
    };

    if (chkPwd(this.state.re_pw) === false) {
      alert("영문, 숫자를 혼합하여 6~12자 이내");
      this.setState({
        pw: "",
        re_pw: ""
      });
    } else {
      if (this.state.pw === this.state.re_pw) {
        alert("일치합니다.");
        this.setState({
          pwCheck: this.state.re_pw
        });
      } else {
        alert("일치하지 않습니다.");
      }
    }
  };

  //서버로 가입 양식 제출
  handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      emailCheck,
      nickname,
      nicknameCheck,
      pwCheck,
      pw,
      re_pw
    } = this.state;

    const signupInfo = {
      email: this.state.emailCheck,
      pw: this.state.pwCheck,
      nickname: this.state.nicknameCheck
    };

    const signup_info = {
      method: "POST",
      body: JSON.stringify(signupInfo),
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (
      email &&
      nickname &&
      pw &&
      re_pw &&
      email === emailCheck &&
      nickname === nicknameCheck &&
      pw === re_pw &&
      re_pw === pwCheck
    ) {
      fetch("https://try-eat.herokuapp.com/users", signup_info)
        .then(alert("가입이 완료되었습니다."))
        .then(this.props.history.push("/login"));
    } else {
      alert("입력값을 확인해주세요");
    }
  };

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <br/>
        <div>
          <div>
            email
            <input
              onChange={this.handleEmail} //onChange
              value={this.state.email}
              type={"text"}
            />
            <button onClick={this.checkEmail}>중복체크</button>
          </div>
          <div>
            닉네임
            <input type="text" value={this.state.nickname} onChange={this.handleNickname}/>
            <button onClick={this.checkNickname}>중복체크</button>
          </div>
          <div>
            비밀번호
            <div>
              <input value={this.state.pw} onChange={this.handlePW} type="text"/>
            </div>
            비밀번호 재확인
            <div>
              <input value={this.state.re_pw} onChange={this.handleRE_PW} type="text"/>
              <button onClick={this.checkPW}>비밀번호 확인</button>
            </div>
          </div>
          <div>
            <button onClick={this.handleSubmit}>가입하기</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TestSignup;