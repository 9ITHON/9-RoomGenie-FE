import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const TERMS = [
  {
    label: "이용약관 동의",
    required: true,
    key: "termsOfService",
  },
  {
    label: "만 14세 이상입니다",
    required: true,
    key: "over14",
  },
  {
    label: "개인정보 수집 및 이용 동의",
    required: true,
    key: "privacy",
  },
  {
    label: "마케팅 서비스 수신 동의",
    required: false,
    key: "marketing",
  },
  {
    label: "마케팅 정보 수신 동의",
    required: false,
    key: "marketingInfo",
  },
  {
    label: "개인정보 제3자 제공 동의",
    required: false,
    key: "thirdParty",
  },
];

function SignUp() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(
    TERMS.reduce((acc, cur) => ({ ...acc, [cur.key]: false }), {})
  );

  const allChecked = TERMS.every((term) => checked[term.key]);
  const requiredChecked = TERMS.filter((t) => t.required).every(
    (term) => checked[term.key]
  );

  const handleAll = () => {
    const newValue = !allChecked;
    const newChecked = {};
    TERMS.forEach((term) => {
      newChecked[term.key] = newValue;
    });
    setChecked(newChecked);
  };

  const handleCheck = (key) => {
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNext = () => {
    if (requiredChecked) {
      navigate("/login");
    }
  };

  return (
    <div className="screen" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', minHeight: '100vh' }}>
      <div className="div" style={{ backgroundColor: '#fff', minHeight: '100vh', position: 'relative', width: '100%', maxWidth: '430px', overflowX: 'hidden' }}>
        <div className="membership-container">
          <div className="membership-header">
            <span
              className="back-arrow"
              onClick={() => navigate(-1)}
              role="button"
              aria-label="뒤로가기"
            >
              &#60;
            </span>
            <div className="membership-title">
              시작을 위해서는<br />
              약관 동의가 필요해요.
            </div>
          </div>
          <div className="terms-box">
            <div className="terms-all">
              <span className="terms-all-label">전체동의</span>
              <span className="terms-all-desc">(선택항목 포함)</span>
              <span
                className={`checkbox-custom${allChecked ? " checked" : ""}`}
                onClick={handleAll}
                role="checkbox"
                aria-checked={allChecked}
                tabIndex={0}
              />
            </div>
            <div className="terms-list">
              {TERMS.map((term) => (
                <div className="terms-item" key={term.key}>
                  <span>
                    {term.label}
                    {term.required && (
                      <span className="terms-required">(필수)</span>
                    )}
                  </span>
                  <span
                    className={`checkbox-custom${checked[term.key] ? " checked" : ""}`}
                    onClick={() => handleCheck(term.key)}
                    role="checkbox"
                    aria-checked={checked[term.key]}
                    tabIndex={0}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            className="next-btn"
            disabled={!requiredChecked}
            onClick={() => navigate("/join")}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
