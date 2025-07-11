import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MdClose } from 'react-icons/md';

const GlobalFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 32px;
  padding: 36px 32px 28px 32px;
  width: 90vw;
  max-width: 400px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (max-width: 480px) {
    width: 85vw;
    padding: 24px 20px 20px 20px;
    border-radius: 24px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #222;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #8b5cf6;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const InputBox = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: 2px solid #ececf0;
  border-radius: 20px;
  background: #fff;
  font-size: 1.1rem;
  color: #222;
  padding: 16px;
  margin-bottom: 32px;
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  font-family: inherit;
  @media (max-width: 480px) {
    min-height: 100px;
    font-size: 1rem;
    margin-bottom: 24px;
    padding: 14px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  background: #f5f5f7;
  color: #888;
  border: none;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 500;
  padding: 16px 0;
  cursor: pointer;
  @media (max-width: 480px) {
    font-size: 1.05rem;
    padding: 14px 0;
  }
`;

const SaveButton = styled.button`
  flex: 1;
  background: linear-gradient(90deg, #c3a8f6 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 500;
  padding: 16px 0;
  cursor: pointer;
  @media (max-width: 480px) {
    font-size: 1.05rem;
    padding: 14px 0;
  }
`;

function EditMissionModal({ open, onClose, onSave, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue);
  if (!open) return null;
  return (
    <Overlay>
      <GlobalFont />
      <Modal>
        <TitleRow>
          <Title>TODAY's MISSION</Title>
          <CloseButton onClick={onClose} aria-label="닫기">
            <MdClose />
          </CloseButton>
        </TitleRow>
        <InputBox
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="오늘의 미션을 입력하세요"
        />
        <ButtonRow>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SaveButton onClick={() => onSave(value)}>저장</SaveButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}

export default EditMissionModal; 