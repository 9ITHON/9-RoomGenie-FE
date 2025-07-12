// api.js
import axios from "axios";

const BASE_URL = "https://drr.kro.kr/api/auth";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1) 인증번호 발송
export const sendVerificationCode = async (phoneNumber, countryCode) => {
  try {
    const response = await api.post("/create/send", {
      phoneNumber,
      countryCode,
    });
    console.log("✅ 인증 요청 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 인증 요청 실패:", error);
    throw error;
  }
};

// 2) 인증번호 단순 검증  (code → verificationCode 로 필드명 변경)
export const verifyCode = async (phoneNumber, code) => {
  try {
    const response = await api.post("/verify", {
      phoneNumber,
      verificationCode: code,   // ← 서버 요구 필드
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response; // status · data 포함
    }
    throw error;
  }
};

// 3) 최종 회원가입/로그인 + 토큰 발급
export const createVerify = async ({
  userName,
  phoneNumber,
  countryCode,
  verificationCode,
  deviceId,
  provider,
  appToken,
}) => {
  try {
    const response = await api.post("/create/verify", {
      userName,
      phoneNumber,
      countryCode,
      verificationCode,
      deviceId,
      provider,
      appToken,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
};

export const login = async ({
    phoneNumber,
    countryCode,
    password,
    deviceId,
    provider,
    appToken,
  }) => {
    try {
      const response = await api.post('/login', {
        phoneNumber,
        countryCode,
        password,
        deviceId,
        provider,
        appToken,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response;
      } else {
        throw error;
      }
    }
  };
  
  export const createPassword = async (password, accessToken) => {
    try {
      const response = await api.post(
        "/create/password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    }
  };