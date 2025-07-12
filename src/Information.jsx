import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Information.css";
import { createPassword } from "./api";

export default function Information() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [error, setError] = useState("");

  // 이메일 유효성 검사
  const validatePhone = (phone) => {
    return /^010-\d{4}-\d{4}$/.test(phone);
  };
  // 비밀번호 유효성 검사 (8~12자, 영문, 숫자, 특수문자 조합)
  const validatePassword = (pw) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,12}$/.test(pw);
  };
  // 생년월일 유효성 검사
  const validateBirth = (year, month, day) => {
    if (!/^\d{4}$/.test(year)) return false;
    if (!/^\d{1,2}$/.test(month) || Number(month) < 1 || Number(month) > 12) return false;
    if (!/^\d{1,2}$/.test(day) || Number(day) < 1 || Number(day) > 31) return false;
    return true;
  };

  const allValid =
    phone &&
    validatePhone(phone) &&
    password &&
    validatePassword(password) &&
    passwordCheck &&
    password === passwordCheck &&
    birthYear &&
    birthMonth &&
    birthDay &&
    validateBirth(birthYear, birthMonth, birthDay);

  const handleBack = () => {
    navigate(-1);
  };


  const handleNext = async (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError("올바른 핸드폰 번호 형식을 입력해주세요.");
      return;
    }
    if (!validatePassword(password)) {
      setError("비밀번호는 8~12자, 영문/숫자/특수문자를 모두 포함해야 합니다.");
      return;
    }
    if (password !== passwordCheck) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!validateBirth(birthYear, birthMonth, birthDay)) {
      setError("올바른 생년월일을 입력해주세요.");
      return;
    }
  
    try {
      setError("");
  
      const token = localStorage.getItem("access-token");
      if (!token) {
        setError("토큰이 없습니다. 다시 인증을 진행해주세요.");
        return;
      }
  
      const result = await createPassword(password, token);
      console.log("비밀번호 생성 성공:", result);
  
      navigate("/nickname", {
        state: {
          phone,
          phoneNumber,
          password,
          birth: `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`,
        },
      });
    } catch (err) {
      console.error("비밀번호 생성 실패:", err);
      setError("비밀번호 생성 중 오류가 발생했습니다.");
    }
  };
  

  // 생년월일 입력 자동 포커스 이동
  const handleBirthYear = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setBirthYear(value);
    if (value.length === 4) {
      document.getElementById("birthMonth").focus();
    }
  };
  const handleBirthMonth = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setBirthMonth(value);
    if (value.length === 2) {
      document.getElementById("birthDay").focus();
    }
  };
  const handleBirthDay = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setBirthDay(value);
  };

  return (
    <div className="screen">
      <div className="div">
        <div className="필수-container">
          {/* 상단 로고 (원하면 추가) */}
          <img src="/KakaoTalk_Photo_2025-07-12-19-34-49 005.png" alt="RoomGenie Logo" className="필수-logo" style={{ width: 160, maxWidth: '90vw', margin: '32px auto 0 auto', display: 'block' }} />
          <div className="필수-title" style={{ marginTop: 32 }}>
            <span className="highlight">필수 정보 입력</span>
          </div>
          <form onSubmit={handleNext} className="필수-input-wrapper">
            <input
              className="필수-input"
              type="tel"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="전화번호"
              required
            />
            <input
              className="필수-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
            <input
              className="필수-input"
              type="password"
              value={passwordCheck}
              onChange={e => setPasswordCheck(e.target.value)}
              placeholder="비밀번호 확인"
              required
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="필수-input"
                type="text"
                placeholder="YYYY"
                value={birthYear}
                onChange={handleBirthYear}
                style={{ width: 60 }}
                maxLength={4}
              />
              -
              <input
                id="birthMonth"
                className="필수-input"
                type="text"
                placeholder="MM"
                value={birthMonth}
                onChange={handleBirthMonth}
                style={{ width: 40 }}
                maxLength={2}
              />
              -
              <input
                id="birthDay"
                className="필수-input"
                type="text"
                placeholder="DD"
                value={birthDay}
                onChange={handleBirthDay}
                style={{ width: 40 }}
                maxLength={2}
              />
            </div>
            {error && <div style={{ color: 'red', margin: '8px 0' }}>{error}</div>}
            <div className="필수-btn-wrapper">
              <button type="submit" className="필수-btn" onClick={() => navigate('/home')}>다음</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}