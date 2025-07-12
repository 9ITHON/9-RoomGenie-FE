import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nickname.css";

function Nickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const handleComplete = () => {
    // 회원가입 완료 후 로그인 페이지로 이동
    navigate("/로그인");
  };

  return (
    <div className="닉네임-container" style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column" }}>
      {/* 상단 로고 */}
      <img
        src="/logo.png"
        alt="RoomGenie Logo"
        className="닉네임-logo"
        style={{ width: 120, margin: "32px auto 0 auto", display: "block" }}
      />
      {/* 뒤로가기 버튼 */}
      <button
        className="닉네임-back-arrow"
        onClick={handleBack}
        style={{
          fontSize: 28,
          color: "#888",
          margin: "32px 0 0 20px",
          cursor: "pointer",
          background: "none",
          border: "none",
          outline: "none",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          position: "absolute",
          left: 0,
          top: 0,
        }}
        aria-label="뒤로가기"
      >
        &#60;
      </button>
      {/* 타이틀 및 설명 */}
      <div className="닉네임-title" style={{ fontSize: 20, fontWeight: 700, color: "#333", margin: "80px 0 0 0", padding: "0 32px", lineHeight: 1.4 }}>
        원활한 서비스을 위해,<br />
        <span style={{ color: "#6C5CE7", fontWeight: 700 }}>닉네임</span>을 입력해주세요!
      </div>
      {/* 입력 필드 */}
      <div className="닉네임-input-wrapper" style={{ margin: "40px 0 0 0", padding: "0 32px" }}>
        <input
          className="닉네임-input"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          style={{
            width: "100%",
            padding: "16px 0",
            border: "none",
            borderBottom: "1.5px solid #e0e0e0",
            fontSize: 16,
            color: "#333",
            background: "transparent",
            outline: "none",
            marginBottom: "32px",
          }}
        />
      </div>
      {/* 버튼 */}
      <div className="닉네임-btn-wrapper">
        <button
          className={`닉네임-btn${nickname ? " active" : ""}`}
          onClick={handleComplete}
          disabled={!nickname}
          style={{
            width: "100%",
            padding: "16px 0",
            background: nickname ? "#A393F7" : "#e0e0e0",
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
            border: "none",
            borderRadius: 24,
            cursor: nickname ? "pointer" : "not-allowed",
            marginTop: 16,
            opacity: 1,
            transition: "background 0.2s, opacity 0.2s",
          }}
        >
          회원가입 완료
        </button>
      </div>
    </div>
  );
}

export default Nickname;