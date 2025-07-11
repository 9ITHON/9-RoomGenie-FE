import React, { useState } from 'react';
import styled from 'styled-components';

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

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const MonthHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const MonthTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: #111;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
  &:hover {
    background: #f0f0f0;
  }
  @media (max-width: 480px) {
    font-size: 1.3rem;
    padding: 6px;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 8px;
  width: 100%;
  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  padding: 8px 0;
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 0;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  width: 100%;
  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const DayButton = styled.button`
  background: ${({ isSelected, isToday, hasTodo }) => {
    if (isSelected) return '#8b5cf6';
    if (isToday) return '#f3e8ff';
    if (hasTodo) return '#e0e7ff';
    return 'transparent';
  }};
  color: ${({ isSelected, isToday, isOtherMonth }) => {
    if (isSelected) return '#fff';
    if (isOtherMonth) return '#ccc';
    return '#333';
  }};
  border: none;
  border-radius: 8px;
  padding: 12px 8px;
  font-size: 1rem;
  font-weight: ${({ isSelected, isToday }) => (isSelected || isToday ? 'bold' : 'normal')};
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#8b5cf6' : '#f0f0f0')};
  }
  @media (max-width: 480px) {
    padding: 10px 6px;
    font-size: 0.9rem;
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

const OKButton = styled.button`
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

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function CalendarModal({ open, onClose, onSelect, todos = [], selectedDate }) {
  const today = new Date();
  const getYMD = (dateStr) => {
    if (!dateStr) return [today.getFullYear(), today.getMonth(), today.getDate()];
    return [
      Number(dateStr.slice(0, 4)),
      Number(dateStr.slice(5, 7)) - 1,
      Number(dateStr.slice(8, 10)) +1
    ];
  };
  const [year, setYear] = useState(getYMD(selectedDate)[0]);
  const [month, setMonth] = useState(getYMD(selectedDate)[1]);
  const [selected, setSelected] = useState(getYMD(selectedDate)[2]);
  const [showTodos, setShowTodos] = useState(false);

  // 모달이 열릴 때마다 selectedDate로 상태를 동기화
  React.useEffect(() => {
    if (open) {
      const [y, m, d] = getYMD(selectedDate);
      setYear(y);
      setMonth(m);
      setSelected(d);
    }
  }, [open, selectedDate]);

  if (!open) return null;

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  const selectedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selected).padStart(2, '0')}`;
  const todosForDate = todos.filter(todo => todo.date === selectedDateStr);

  const handlePrev = () => {
    if (month === 0) {
      setYear(y => y - 1);
      setMonth(11);
    } else {
      setMonth(m => m - 1);
    }
  };
  const handleNext = () => {
    if (month === 11) {
      setYear(y => y + 1);
      setMonth(0);
    } else {
      setMonth(m => m + 1);
    }
  };
  const handleSelect = () => {
    setShowTodos(true);
    onSelect && onSelect(new Date(year, month, selected));
    onClose && onClose();
  };

  return (
    <Overlay>
      <Modal>
        <TitleRow>
          <Title>Calendar</Title>
          <CloseButton onClick={onClose} aria-label="달력 닫기">&times;</CloseButton>
        </TitleRow>
        <CalendarContainer>
          <MonthHeader>
            <NavButton onClick={handlePrev} aria-label="이전 달">&lt;</NavButton>
            <MonthTitle>{monthNames[month]} {year}</MonthTitle>
            <NavButton onClick={handleNext} aria-label="다음 달">&gt;</NavButton>
          </MonthHeader>
          <WeekDays>
            {[...'SMTWTFS'].map((d, i) => (
              <WeekDay key={i}>{d}</WeekDay>
            ))}
          </WeekDays>
          <DaysGrid>
            {Array(firstDay).fill(null).map((_, i) => <div key={i} />)}
            {Array(daysInMonth).fill(null).map((_, i) => (
              <DayButton
                key={i+1}
                isSelected={selected === i+1}
                isToday={year === today.getFullYear() && month === today.getMonth() && i+1 === today.getDate()}
                hasTodo={todosForDate.some(todo => todo.date === selectedDateStr && todo.day === i+1)}
                onClick={() => { setSelected(i+1); setShowTodos(false); }}
              >
                {i+1}
              </DayButton>
            ))}
          </DaysGrid>
        </CalendarContainer>
        <ButtonRow>
          <CancelButton onClick={onClose}>CANCEL</CancelButton>
          <OKButton onClick={handleSelect}>OK</OKButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
}

export default CalendarModal; 