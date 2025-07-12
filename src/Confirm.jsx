import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Confirm.css";
import PhoneAuth from './PhoneAuth';

function Confirm() {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className="screen" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', minHeight: '100vh' }}>
      <div className="div" style={{ backgroundColor: '#fff', minHeight: '100vh', position: 'relative', width: '100%', maxWidth: '430px', overflowX: 'hidden' }}>
        <div className="join2-container">
          <button className="join2-back-arrow" onClick={handleBack}>
            &#60;
          </button>
          <img
            src="KakaoTalk_Photo_2025-07-12-19-34-50 013.png"
            alt="RoomGenie Logo"
            className="confirm-logo"
            style={{ width: '160px', maxWidth: '90vw', margin: '32px auto 0 auto', display: 'block' }}
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
              원활한 서비스를 위해 <b>인증 번호</b>를 입력해주세요.
            </div>
            {/*<input
              className="confirm-input"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호를 입력해 주세요"
            />*/}
            <PhoneAuth />
            <button
              className="confirm-next-btn"
              onClick={() => navigate('/information')}
              disabled={code.length === 0}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Confirm;
