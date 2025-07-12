import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: 로그인 로직 구현
    setIsLoading(false);
  };

  return (
    <div className="screen">
      <div className="div">
        <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <h1 className="login-title">로그인</h1>
                            <p className="login-subtitle">Welcome to RoomGenie</p>
                        </div>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="phoneNumber" className="form-label">전화번호</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="전화번호를 입력해주세요"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">비밀번호</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="비밀번호를 입력해주세요"
                                    required
                                />
                            </div>
                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}
                            <button 
                                type="submit" 
                                className="login-button"
                                disabled={isLoading}
                            >
                                {isLoading ? '로그인 중...' : '로그인'}
                            </button>
                        </form>
                        <div className="login-footer">
                            <p className="signup-text">
                                계정이 없으신가요?{' '}
                                <span className="signup-link" style={{color:'#7d5df6', textDecoration:'underline', cursor:'pointer'}} onClick={() => navigate('/signup')}>회원가입</span>
                            </p>
                            <span className="forgot-password" style={{color:'#888', fontSize:13, cursor:'pointer'}} onClick={() => navigate('/forgot-password')}>
                                비밀번호를 잊으셨나요?
                            </span>
                        </div>
                    </div>
                </div>
      </div>
    </div>
  );
}
export default Login;