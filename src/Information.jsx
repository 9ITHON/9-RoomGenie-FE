import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Information.css";

function 필수() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [error, setError] = useState("");

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    // 간단한 이메일 정규식
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    // 간단한 날짜 유효성 (윤년 등은 체크하지 않음)
    return true;
  };

  const allValid =
    email &&
    validateEmail(email) &&
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

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
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
    setError("");
    // 닉네임 페이지로 이동, 필요한 정보 전달
    navigate("/닉네임", {
      state: {
        phone,
        email,
        password,
        birth: `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`,
      },
    });
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
}