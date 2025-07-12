import { useState } from 'react'
import './App.css'
import TodayMissionOverlay from './TodayMissionOverlay'
import WeeklyTodoList from './WeeklyTodoList'
import styled from 'styled-components'
import EditMissionModal from './EditMissionModal'
import { MdEdit, MdAdd } from 'react-icons/md'
import MissionProofPage from './MissionProofPage';
import AddTodoModal from './AddTodoModal';
import CalendarModal from './CalendarModal';
import GeniePage from './GeniePage';
import { createGlobalStyle } from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login.jsx';
import Membership from './Membership.jsx';

const Header = styled.header`
  width: 100vw;
  padding: 0;
  margin: 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LogoImg = styled.img`
  height: 100px;
  padding: 10px;
  margin: 0;
  @media (max-width: 480px) {
    height: 56px;
    padding: 8px;
  }
`;

const MissionButton = styled.button`
  background: #8b5cf6;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 20px 0;
  width: 100%;
  font-size: 1.3rem;
  font-weight: bold;
  margin: 32px 0 18px 0;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.12);
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #6d28d9;
  }
  @media (max-width: 480px) {
    padding: 16px 0;
    font-size: 1.1rem;
    margin: 24px 0 14px 0;
  }
`;

const MissionCard = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 28px 20px 24px 20px;
  margin: 24px 0 32px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (max-width: 480px) {
    padding: 20px 16px 18px 16px;
    margin: 16px 0 24px 0;
    border-radius: 20px;
  }
`;

const MissionTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const MissionTitle = styled.h2`
  font-family: 'Pacifico', cursive;
  font-size: 1.3rem;
  font-weight: bold;
  color: #111;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const EditIconBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #bdbdbd;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #8b5cf6;
  }
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const MissionContentBox = styled.div`
  background: #f7f7fa;
  border-radius: 18px;
  min-height: 70px;
  margin-bottom: 24px;
  padding: 18px 14px;
  font-size: 1.1rem;
  color: #444;
  @media (max-width: 480px) {
    min-height: 60px;
    margin-bottom: 18px;
    padding: 14px 12px;
    font-size: 1rem;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  background: #fff;
  box-shadow: 0px 1px 2px #0000000d;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const FooterItem = styled.a`
  flex: 1;
  text-align: center;
  color: #7869c5;
  font-size: 15px;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  text-decoration: none;
  padding: 18px 0;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #f3e8ff;
    color: #5f4b8b;
  }
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 16px 0;
  }
`;

// 미션 DB (카테고리별, 랜덤 추출용)
const MISSION = [
  { id: 1, category: '거실', task: '소파 위 쿠션 정리하기', done: false },
  { id: 2, category: '거실', task: '바닥 눈에 보이는 쓰레기 줍기', done: false },
  { id: 3, category: '거실', task: '리모컨 제자리에 두기', done: false },
  { id: 4, category: '주방', task: '싱크대 그릇 3개만 씻기', done: false },
  { id: 5, category: '주방', task: '조리대 위 물건 3개만 치우기', done: false },
  { id: 6, category: '주방', task: '음식물 쓰레기 비우기', done: false },
  { id: 7, category: '욕실', task: '칫솔 바꾸기', done: false },
  { id: 8, category: '욕실', task: '세면대 물때 닦기 (30초만)', done: false },
  { id: 9, category: '욕실', task: '수건 정리하기', done: false },
  { id: 10, category: '침실', task: '이불 정리하기', done: false },
  { id: 11, category: '침실', task: '바닥에 떨어진 옷 하나만 정리', done: false },
  { id: 12, category: '침실', task: '책상 위 컵 치우기', done: false },
  { id: 13, category: '세탁', task: '세탁기 돌릴 빨래 모으기', done: false },
  { id: 14, category: '세탁', task: '세탁기 돌리기', done: false },
  { id: 15, category: '세탁', task: '세탁물 널기 (5개 이상)', done: false },
  { id: 16, category: '기타', task: '책상 위 먼지 닦기', done: false },
  { id: 17, category: '기타', task: '마감된 음식 버리기', done: false },
  { id: 18, category: '기타', task: '휴지통 비우기', done: false },
  { id: 19, category: '기타', task: '바닥 클리너로 1분 닦기', done: false },
  { id: 20, category: '기타', task: '향초 켜기', done: false },
];

function getTodayMission() {
  // 오늘 날짜를 기준으로 항상 같은 미션이 나오도록(매일 바뀌게)
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  // 간단한 시드 기반 랜덤
  let idx = seed % MISSION.length;
  return MISSION[idx];
}

function getTodayStr() {
  const today = new Date();
  return today.toISOString().slice(0, 10);
}

//폰트
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto:wght@400;500&display=swap');
  body {
    background: #fff;
    margin: 0;
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
  }
`;

function HomePage() {
  const [showMission, setShowMission] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [mission, setMission] = useState(getTodayMission());
  const [addTodoOpen, setAddTodoOpen] = useState(false);
  const [missionAccepted, setMissionAccepted] = useState(false);
  const [showProof, setShowProof] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();
  
  // WeeklyTodoList와 MonthlyCalendar가 공유할 todo 상태
  const [todos, setTodos] = useState([]);
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const [selectedTodoDate, setSelectedTodoDate] = useState(getTodayStr());

  // todo 완료/미완료 토글 함수
  const toggleTodo = (id) => {
    setTodos(todos => todos.map(todo => {
      if (todo.id === id) {
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        return {
          ...todo,
          done: !todo.done,
          completedDate: !todo.done ? todayStr : null
        };
      }
      return todo;
    }));
  };

  // 특정 날짜의 완료된 todo들을 가져오는 함수
  const getCompletedTodosByDate = (dateStr) => {
    return todos.filter(todo => todo.done && todo.completedDate === dateStr);
  };

  // 할 일 추가 함수
  const addTodo = (text) => {
    setTodos(todos => [
      ...todos,
      { id: Date.now(), text, done: false, completedDate: null }
    ]);
  };

  // Checklist + 버튼 클릭 핸들러
  const handleAddTodoClick = () => setIsAddTodoOpen(true);
  const handleAddTodo = (todoText) => {
    setTodos(prev => [...prev, { text: todoText, done: false, date: selectedTodoDate }]);
  };

  // 캘린더 모달에서 날짜 선택 시 호출
  const handleCalendarSelect = (dateObj) => {
    // dateObj는 Date 객체
    const dateStr = dateObj.toISOString().slice(0, 10); // YYYY-MM-DD
    setSelectedTodoDate(dateStr);
  };

  return (
    <>
      <GlobalStyle />
      <div className="screen" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', minHeight: '100vh' }}>
        <div className="div" style={{ backgroundColor: '#fff', minHeight: '100vh', position: 'relative', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
          <Header>
            <LogoImg src="KakaoTalk_Photo_2025-07-12-19-34-48 003.pngKakaoTalk_Photo_2025-07-12-19-34-50 013.png" alt="RoomGENIE" />
          </Header>
          <main style={{ paddingBottom: '80px' }}>
            <MissionCard>
              <MissionTitleRow>
                <MissionTitle>TODAY's MISSION</MissionTitle>
                <EditIconBtn onClick={() => setEditOpen(true)} aria-label="미션 수정">
                  <MdEdit />
                </EditIconBtn>
              </MissionTitleRow>
              <MissionContentBox>
                {mission ? mission.task : <span style={{ color: '#bbb' }}>&quot; &quot;</span>}
              </MissionContentBox>
              {!missionAccepted ? (
                <MissionButton onClick={() => setMissionAccepted(true)}>
                  수락
                </MissionButton>
              ):(
                <MissionButton onClick={() => navigate("/MissionProofPage")}>
                  미션 인증
                </MissionButton>
              )}
            </MissionCard>
            <WeeklyTodoList
              todos={todos}
              onToggleTodo={toggleTodo}
              onAddTodo={handleAddTodoClick}
              onEdit={() => {}}
              getCompletedTodosByDate={getCompletedTodosByDate}
              selectedTodoDate={selectedTodoDate}
              onCalendarSelect={handleCalendarSelect}
            />
          </main>
          <footer>
            <FooterNav>
            <FooterItem onClick={() => navigate('/home')}>홈</FooterItem>
            <FooterItem onClick={() => navigate('/genie')}>GENIE</FooterItem>
            </FooterNav>
          </footer>
          {showMission && (
            <TodayMissionOverlay mission={mission ? mission.task : ''} onClose={() => setShowMission(false)}
              onProof={() => setShowProof(true)}
            />
          )}
          <EditMissionModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            onSave={val => { setMission(m => ({ ...m, task: val })); setEditOpen(false); }}
            defaultValue={mission ? mission.task : ''}
          />
          <EditMissionModal
            open={addTodoOpen}
            onClose={() => setAddTodoOpen(false)}
            onSave={val => { if(val.trim()) addTodo(val); setAddTodoOpen(false); }}
            defaultValue=""
          />
          <AddTodoModal
            open={isAddTodoOpen}
            onClose={() => setIsAddTodoOpen(false)}
            onAdd={handleAddTodo}
          />
          {showCalendar && (
            <CalendarModal open={showCalendar} onClose={() => setShowCalendar(false)} todos={todos} onSelect={handleCalendarSelect} />
          )}
          {showProof && (
            <MissionProofPage onBack={() => setShowProof(false)} />
          )}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/genie" element={<GeniePage onBack={() => window.history.back()} />} />
      <Route path="/MissionProofPage" element={<MissionProofPage onBack={() => window.history.back()} />} />
    </Routes>
  );
}

export default App
