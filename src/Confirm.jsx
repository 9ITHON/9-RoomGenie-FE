import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Confirm.css";

function Confirm() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달된 전화번호와 인증번호
  const phoneFromPrev = location.state?.phone || "";
  const providedCode = location.state?.verificationCode || "";

  const [phone, setPhone] = useState(phoneFromPrev);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setPhone(phoneFromPrev);
  }, [phoneFromPrev]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (code === providedCode) {
      setError("");
      navigate("/필수정보", { state: { phone } });
    } else {
      setError("인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="join2-container">
      <button className="join2-back-arrow" onClick={handleBack}>
        &#60;
      </button>
      <img
        src="KakaoTalk_Photo_2025-07-12-19-34-50 013.png"
        alt="RoomGenie Logo"
        className="confirm-logo"
        style={{ marginTop: 0 }}
      />
      <div style={{ padding: "0 32px" }}>
        <div className="confirm-title" style={{ marginTop: "32px" }}>
          휴대폰 번호로<br />
          간편하게 가입해요!
        </div>
        <div
          style={{
            color: "#888",
            fontSize: "14px",
            marginTop: "8px",
            marginBottom: "32px",
            fontWeight: 400,
          }}
        >
          원활한 서비스를 위해 <b>휴대폰 번호</b>를 입력해주세요.
        </div>
        <input
          className="confirm-input"
          type="text"
          value={phone}
          placeholder="전화번호를 입력해주세요."
          disabled
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "16px 0",
            border: "none",
            borderBottom: "1px solid #ddd",
            marginBottom: "24px",
            background: "#f8f8f8",
            color: "#888",
          }}
        />
        <input
          className="confirm-input"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="인증번호를 입력해 주세요"
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "16px 0",
            border: "none",
            borderBottom: "1px solid #ddd",
            marginBottom: "24px",
          }}
        />
        {error && (
          <div style={{ color: "#e74c3c", fontSize: "13px", marginBottom: "12px" }}>
            {error}
          </div>
        )}
        <button
          className="confirm-next-btn"
          onClick={handleNext}
          style={{
            width: "100%",
            background: "#7B6FF2",
            color: "#fff",
            fontSize: "18px",
            fontWeight: 600,
            border: "none",
            borderRadius: "24px",
            padding: "16px 0",
            marginTop: "16px",
            cursor: code.length === 0 ? "not-allowed" : "pointer",
            opacity: code.length === 0 ? 0.5 : 1,
            transition: "opacity 0.2s",
          }}
          disabled={code.length === 0}
        >
          다음
        </button>
      </div>
    </div>
  );
}