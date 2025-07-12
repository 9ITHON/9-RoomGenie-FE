import React, { useState } from 'react';
import { sendVerificationCode, verifyCode, createVerify } from './api';
import { useNavigate } from 'react-router-dom';

export default function PhoneAuth() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('82');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [errorCode, setErrorCode] = useState(null);

  const handleSendCode = async () => {
    try {
      await sendVerificationCode(phoneNumber, countryCode);
      setMessage('✅ 인증번호가 전송되었습니다!');
      setErrorCode(null);
      setStep(2);
    } catch (error) {
      setMessage('❌ 인증 요청 실패');
      setErrorCode('SEND_FAIL');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await verifyCode(phoneNumber, code.toString());
      setMessage("🎉 인증 성공! 다음 단계로 이동합니다.");
      setErrorCode(null);
      setStep(3);
    } catch (error) {
      if (error.status === 409) {
        setMessage("🔒 이미 가입된 사용자입니다. 로그인으로 이동합니다.");
        setErrorCode('USER_3');
        navigate('/');
      } else {
        setMessage(error.data?.message || "❌ 인증 실패");
        setErrorCode(error.data?.errorCode || 'VERIFY_FAIL');
      }
    }
  };

  const handleFinalVerify = async () => {
    try {
      const res = await createVerify({
        userName: "testName",
        phoneNumber,
        countryCode,
        verificationCode: code,
        deviceId: "testDeviceId",
        provider: "ios",
        appToken: "testToken",
      });

      const { accessToken, refreshToken } = res.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setMessage('🎉 로그인 완료!');
      setErrorCode(null);
      navigate('/nickname');
    } catch (error) {
      // ✅ 인증 번호가 만료되었을 때
    if (error.status === 401 && error.data?.errorCode === "AUTH_2") {
      setMessage("⏰ 인증번호가 만료되었습니다. 다시 요청해주세요.");
      setErrorCode("AUTH_2");
      setStep(1); // 재요청 단계로 이동
      return;
    }

    // ✅ 이미 가입된 사용자
    if (error.status === 409 && error.data?.errorCode === "USER_3") {
      setMessage("⚠️ 이미 가입된 사용자입니다. 로그인으로 이동합니다.");
      setErrorCode("USER_3");
      navigate('/');
      return;
    }

    // ✅ 기타 에러
    setMessage(error.data?.message || "❌ 인증 실패");
    setErrorCode("FINAL_FAIL");
  }
};


  return (
    <div>
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="전화번호 (예: 01012345678)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />
          <button onClick={handleSendCode}>인증번호 요청</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="인증번호 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />
          <button onClick={handleFinalVerify}>인증번호 확인</button>

          {errorCode === '401' && (
            <>
              <p style={{ color: 'red' }}>
                ❌ 인증번호가 틀렸습니다. <br />
                다시 인증번호를 요청해주세요.
              </p>
              <button onClick={handleSendCode}>📩 인증번호 다시 받기</button>
            </>
          )}
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
