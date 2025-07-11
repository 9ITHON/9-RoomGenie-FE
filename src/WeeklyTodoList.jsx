import styled from 'styled-components';
import { MdAdd, MdCalendarToday } from 'react-icons/md';
import { useState } from 'react';
import CalendarModal from './CalendarModal';

const Card = styled.section`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 6px -1px #0000001a;
  width: 90vw;
  max-width: 400px;
  margin: 32px auto 0 auto;
  position: relative;
  padding: 0;
  box-sizing: border-box;
  @media (max-width: 480px) {
    width: 85vw;
    margin: 24px auto 0 auto;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px 0 24px;
  margin-bottom: 0;
  @media (max-width: 480px) {
    padding: 0 16px 0 16px;
  }
`;

const Title = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  color: #222;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CalendarIcon = styled(MdCalendarToday)`
  font-size: 1.45rem;
  color: #222;
  cursor: pointer;
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const TodoSection = styled.div`
  background: linear-gradient(90deg, rgba(191, 173, 234, 1) 0%, rgba(106, 91, 191, 1) 100%);
  border-radius: 20px;
  min-height: 205px;
  margin: 20px 0 0 0;
  padding: 20px 20px 15px 20px;
  position: relative;
  box-shadow: 0px 1px 2px #0000000d;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 480px) {
    min-height: 180px;
    padding: 16px 16px 12px 16px;
    margin: 16px 0 0 0;
  }
`;

const TodoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  @media (max-width: 480px) {
    margin-bottom: 14px;
  }
`;

const TodoTitle = styled.span`
  font-family: 'Pacifico', cursive;
  font-size: 24px;
  color: #fff;
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const PlusIcon = styled(MdAdd)`
  position: absolute;
  right: 18px;
  bottom: 18px;
  color: #fff;
  font-size: 2.1rem;
  cursor: pointer;
  transition: color 0.2s;
  @media (max-width: 480px) {
    right: 14px;
    bottom: 14px;
    font-size: 1.8rem;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  color: #fff;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  text-decoration: ${({ done }) => (done ? 'line-through' : 'none')};
  opacity: ${({ done }) => (done ? 0.6 : 1)};
  @media (max-width: 480px) {
    margin-bottom: 12px;
    font-size: 13px;
  }
`;

const Checkbox = styled.input`
  margin-right: 12px;
  @media (max-width: 480px) {
    margin-right: 10px;
  }
`;

const EmptyMsg = styled.div`
  color: #ede9fe;
  font-size: 1.1rem;
  text-align: center;
  margin: 32px 0 0 0;
  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 24px 0 0 0;
  }
`;

function WeeklyTodoList({ todos, onToggleTodo, onAddTodo, getCompletedTodosByDate, selectedTodoDate, onCalendarSelect }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const handleCalendarClick = () => setShowCalendar(true);
  const handleCloseCalendar = () => setShowCalendar(false);

  // 날짜 필터링
  const filteredTodos = selectedTodoDate
    ? todos.filter(todo => todo.date === selectedTodoDate)
    : todos;

  const handleCalendarModalSelect = (dateObj) => {
    onCalendarSelect && onCalendarSelect(dateObj);
    setShowCalendar(false);
  };

  // 연도 추출
  const yearStr = selectedTodoDate ? selectedTodoDate.slice(0, 4) : '';
  const monthStr = selectedTodoDate ? selectedTodoDate.slice(5, 7)-1 : '';

  return (
    <Card>
      <TitleRow>
        <Title>{yearStr}년 {monthStr}월 TODOlist</Title>
        <CalendarIcon onClick={handleCalendarClick} />
      </TitleRow>
      <TodoSection>
        <TodoHeader>
          <TodoTitle>TODOlist</TodoTitle>
        </TodoHeader>
        {filteredTodos.length === 0 ? (
          <EmptyMsg>할 일이 없습니다.</EmptyMsg>
        ) : (
          <TodoList>
            {filteredTodos.map(todo => (
              <TodoItem key={todo.text + todo.date} done={todo.done}>
                <Checkbox
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => onToggleTodo(todo.id)}
                />
                {todo.text}
              </TodoItem>
            ))}
          </TodoList>
        )}
        <PlusIcon
          aria-label="할 일 추가"
          tabIndex={0}
          onClick={onAddTodo}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onAddTodo(); }}
        />
      </TodoSection>
      {showCalendar && (
        <CalendarModal open={showCalendar} onClose={handleCloseCalendar} todos={todos} onSelect={handleCalendarModalSelect} selectedDate={selectedTodoDate} />
      )}
    </Card>
  );
}

export default WeeklyTodoList;
