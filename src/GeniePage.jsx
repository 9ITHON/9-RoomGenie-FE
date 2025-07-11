import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { MdArrowBack, MdAdd } from 'react-icons/md';

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 32px;
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
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #222;
  cursor: pointer;
  margin-right: 8px;
`;

const TopTitle = styled.div`
  font-size: 1.35rem;
  font-weight: bold;
  color: #222;
`;

const ImageBox = styled.div`
  width: 90vw;
  max-width: 400px;
  height: 180px;
  background: #f3f3f3;
  border-radius: 16px;
  margin: 32px auto 18px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 1.15rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const PlusIcon = styled(MdAdd)`
  font-size: 3.5rem;
  color: #a3a3a3;
`;

const ImageInput = styled.input`
  display: none;
`;

const LabelBox = styled.div`
  width: 90vw;
  max-width: 400px;
  min-height: 80px;
  background: #f5f5f7;
  border-radius: 16px;
  margin: 0 auto 18px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  font-size: 1.1rem;
`;

const ButtonRow = styled.div`
  width: 90vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 18px auto 0 auto;
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
`;

const GradientBtn = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #c3a8f6 0%, #8b5cf6 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 1.13rem;
  font-weight: 500;
  padding: 16px 0;
  cursor: pointer;
`;

export default function GeniePage({ onBack }) {
  const [image, setImage] = useState(null);
  const fileRef = useRef();
  const [labels, setLabels] = useState(['AI vision labeling']);

  return (
    <Wrapper>
      <TopBar>
        <BackBtn onClick={onBack}><MdArrowBack /></BackBtn>
        <TopTitle>GENIE</TopTitle>
      </TopBar>
      <ImageBox onClick={() => fileRef.current && fileRef.current.click()}>
        {image ? (
          <img src={image} alt="user" style={{width:'100%',height:'100%',objectFit:'cover'}} />
        ) : (
          <>
            <PlusIcon />
            <div style={{position:'absolute', bottom:24, width:'100%', textAlign:'center', color:'#222', fontSize:'1.1rem'}}>Please confirm your user picture.</div>
          </>
        )}
        <ImageInput
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              const url = URL.createObjectURL(e.target.files[0]);
              setImage(url);
            }
          }}
        />
      </ImageBox>
      <LabelBox>
        {labels.join(', ')}
      </LabelBox>
      <ButtonRow>
        <OutlinedBtn>Recreate AI Photo</OutlinedBtn>
        <GradientBtn>Confirm Photos</GradientBtn>
      </ButtonRow>
    </Wrapper>
  );
} 