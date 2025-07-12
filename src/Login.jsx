import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call for login
        try {
            // Here you would typically make an API call to your backend
            // For now, we'll simulate a login check
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock validation - replace with actual API call
            if (formData.email === 'test@example.com' && formData.password === 'password123') {
                // Successful login - redirect to home page
                window.location.href = '/home';
            } else {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">로그인</h1>
                    <p className="login-subtitle">Welcome to RoomGenie</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">이메일</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="이메일을 입력해주세요"
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
                        <a href="/signup" className="signup-link">회원가입</a>
                    </p>
                    <a href="/forgot-password" className="forgot-password">
                        비밀번호를 잊으셨나요?
                    </a>
                </div>
            </div>
        </div>
    );
};
