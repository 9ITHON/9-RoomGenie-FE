import axios from "axios";

const BASE_URL = "https://drr.kro.kr/api/auth"; // 서버 URL    172.17.64.20  192.168.0.12 172.17.96.111
// 118.67.142.14 192.168.0.15 192.168.45.233
const BASE_URL2 = "https://drr.kro.kr/api";

const BASE_URL3 = "https://drr.kro.kr/api/auth/refresh";
// const BASE_URL = "http://172.17.98.6:8080/api/auth"; // 서버 URL    172.17.64.20  192.168.0.12 172.17.96.111
// // 118.67.142.14 192.168.0.15 192.168.45.233
// const BASE_URL2 = "http://172.17.98.6:8080/api";


export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const api2 = axios.create({
    baseURL: BASE_URL2,
    headers: {
        "Content-Type": "application/json",
    },
});

export const api3 = axios.create({
    baseURL: BASE_URL3,
    headers: {
        "Content-Type": "application/json",
    },
});

// 에러 타입 정의
interface ApiError {
    response?: {
        data?: any;
    };
    message?: string;
}

// 인증 코드 발송(수정함) --> 재전송 포함
export const sendVerificationCode = async (phoneNumber: string, countryCode: string) => {
    try {
        const response = await api.post("/create/send", {phoneNumber, countryCode});

        // 인증번호를 사용하지 않고 성공 여부만 확인
        console.log("Verification request sent successfully.");

        return response.data; // 인증번호 없이 응답 데이터만 반환
    } catch (error) {
        throw error;
    }
};