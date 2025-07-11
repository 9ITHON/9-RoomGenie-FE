import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 32px;
  padding: 48px 32px 36px 32px;
  min-width: 320px;
  min-height: 260px;
  box-shadow: 0 8px 32px rgba(139,92,246,0.18);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95vw;
  @media (max-width: 600px) {
    min-width: 90vw;
    padding: 24px 8px 18px 8px;
    border-radius: 18px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #bbb;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #8b5cf6;
  }
`;

const Title = styled.h2`
  margin: 0 0 18px 0;
  font-size: 2.1rem;
  font-weight: bold;
  color: #8b5cf6;
  text-align: center;
`;

const MissionImage = styled.div`
  width: 90px;
  height: 90px;
  background: #ede9fe;
  border-radius: 50%;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  color: #8b5cf6;
`;

const Description = styled.p`
  font-size: 1.18rem;
  color: #444;
  margin-bottom: 36px;
  text-align: center;
`;

const CompleteButton = styled.button`
  background: #8b5cf6;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 16px 48px;
  font-size: 1.18rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.10);
  &:hover {
    background: #6d28d9;
  }
`;

function TodayMissionOverlay({ mission, onClose, onProof }) {
  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <MissionImage>🎯</MissionImage>
        <Title>오늘의 미션</Title>
        <Description>
          오늘의 미션: <b>{mission ? mission : '미션이 없습니다.'}</b>
        </Description>
        <CompleteButton onClick={onProof}>미션 인증</CompleteButton>
      </Modal>
    </Overlay>
  );
}

export default TodayMissionOverlay; 