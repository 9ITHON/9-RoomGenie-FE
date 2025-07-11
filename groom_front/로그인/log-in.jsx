import React from "react";
import "./RoomGenieLogin.css";

export default function RoomGenieLogin() {
  return (
    <div className="login-container">
      <h1 className="logo-text">RoomGenie</h1>

      <input type="text" placeholder="아이디" className="input-field" />
      <input type="password" placeholder="비밀번호" className="input-field" />

      <div className="auto-login">
        <input type="checkbox" id="auto" />
        <label htmlFor="auto">자동 로그인</label>
      </div>

      <button className="btn login-btn">로그인</button>
      <button className="btn signup-btn">회원가입</button>
    </div>
  );
}