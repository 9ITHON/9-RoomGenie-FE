import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { MdArrowBack } from 'react-icons/md';

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  overflow-x: hidden;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  padding: 0 0 0 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #222;
  cursor: pointer;
  margin-right: 8px;
  padding: 8px;
`;

const TopTitle = styled.div`
  font-size: 1.35rem;
  font-weight: bold;
  color: #222;
  flex: 1;
  text-align: center;
  margin-right: 48px;
`;

const PhotoBox = styled.div`
  width: 90vw;
  max-width: 400px;
  height: 220px;
  background: #f3f3f3;
  border-radius: 16px;
  margin: 32px auto 18px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  font-size: 1.15rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  @media (max-width: 480px) {
    width: 85vw;
    height: 200px;
    font-size: 1rem;
  }
`;

const PhotoInput = styled.input`
  display: none;
`;

const BtnRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 18px 0 0 0;
  align-items: center;
  width: 90vw;
  max-width: 400px;
  @media (max-width: 480px) {
    width: 85vw;
    gap: 10px;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #c3a8f6 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 1.18rem;
  font-weight: 500;
  padding: 18px 0;
  margin-bottom: 2px;
  cursor: pointer;
  @media (max-width: 480px) {
    font-size: 1.1rem;
    padding: 16px 0;
  }
`;

const OutlinedBtn = styled.button`
  width: 100%;
  background: #fff;
  color: #8b5cf6;
  border: 2px solid #c3a8f6;
  border-radius: 16px;
  font-size: 1.13rem;
  font-weight: 500;
  padding: 16px 0;
  cursor: pointer;
  @media (max-width: 480px) {
    font-size: 1.05rem;
    padding: 14px 0;
  }
`;

function MissionProofPage({ onBack }) {
  const [photo, setPhoto] = useState(null);
  const fileRef = useRef();
  
  const handleReselect = () => {
    setPhoto(null);
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleSubmit = () => {
    console.log('Submitted');
  };
  
  return (
    <Wrapper>
      <TopBar>
        <BackBtn onClick={onBack}><MdArrowBack /></BackBtn>
        <TopTitle>미션 인증</TopTitle>
      </TopBar>
      <PhotoBox onClick={() => fileRef.current && fileRef.current.click()}>
        {photo ? (
          <img src={photo} alt="인증 사진" style={{width:'100%',height:'100%',objectFit:'cover'}} />
        ) : (
          '인증할 사진을 선택하세요'
        )}
        <PhotoInput
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              const url = URL.createObjectURL(e.target.files[0]);
              setPhoto(url);
            }
          }}
        />
      </PhotoBox>
      <BtnRow>
        <SubmitBtn onClick={handleSubmit}>제출하기</SubmitBtn>
        <OutlinedBtn onClick={handleReselect}>다시 선택</OutlinedBtn>
        <OutlinedBtn onClick={onBack}>취소</OutlinedBtn>
      </BtnRow>
    </Wrapper>
  );
}

export default MissionProofPage; 