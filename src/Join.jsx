import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";

const PHONE_REGEX = /^010-\d{4}-\d{4}$/;

function formatPhoneNumber(value) {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  // Format as 010-XXXX-XXXX
  if (digits.length <= 3) return digits;
  if (digits.length <= 7)
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

function Join() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const isPhoneValid = PHONE_REGEX.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPhoneValid) {
      navigate("/confirm");
    }
  };

  return (
    <div className="screen">
      <div className="div">
        <div className="join-container">
          {/* 상단 로고 */}
          <img
            src="/KakaoTalk_Photo_2025-07-12-19-34-49 005.png"
            alt="RoomGenie Logo"
            className="join-logo"
            style={{ width: 160, maxWidth: '90vw', margin: '32px auto 0 auto', display: 'block' }}
          />
          {/* 뒤로가기 화살표 */}
          <button
            className="join-back-arrow"
            onClick={() => navigate("/signup")}
            aria-label="뒤로가기"
            type="button"
          >
            &#60;
          </button>
          {/* 타이틀 및 설명 */}
          <div className="join-title" style={{ marginTop: 32 }}>
            <span style={{ color: "#6C5CE7" }}>휴대폰 번호로</span>
            <br />
            간편하게 가입해요!
          </div>
          <div className="join-desc" style={{ marginTop: 8, color: "#888", fontSize: 14 }}>
            원활한 서비스를 위해 <b>휴대폰 번호</b>를 입력해주세요.
          </div>
          {/* 입력 폼 */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="join-input-wrapper" style={{ marginTop: 40 }}>
              <input
                type="tel"
                className="join-input"
                placeholder={isFocused || phone ? "" : "전화번호를 입력해주세요."}
                value={phone}
                onChange={handlePhoneChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={13}
                inputMode="numeric"
                pattern="\d*"
              />
            </div>
            <div className="join-btn-wrapper">
              <button
                className="join-btn"
                type="submit"
                style={{
                  marginTop: 48,
                  background: isPhoneValid ? "#A393F7" : "#e0e0e0",
                  color: isPhoneValid ? "#fff" : "#aaa",
                }}
                onClick={() => navigate('/confirm')}
              >
                인증 문자 받기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Join;