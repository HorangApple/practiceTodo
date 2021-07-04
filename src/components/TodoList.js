import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

// 11.8. react-virtualized를 사용한 렌더링 최적화 (p.305)
// react-virtualized 는 화면 상 보여줄 부분만 렌더링해주는 라이브러리로
// 이를 활용하여 낭비되는 지원을 아낄 수 있다.
const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );
  return (
    <List
      className="TodoList"
      width={512}
      height={513}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: 'none' }}
    />
  );
};

// 11.7 TodoList 컴포넌트 최적화하기 (p.304)
// 현재 상태에서 TodoList 는 todos 배열이 업데이트 될 때만 리렌더링이 되기 때문에
// 불필요한 리렌더링이 발생할 가능성이 없다. 그래서 React.memo 를 적용하지 않아도 괜찮다.
export default TodoList;
