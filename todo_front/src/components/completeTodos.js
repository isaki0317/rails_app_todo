import React from "react";

export const CompleteTodos = (props) => {
  const { todos, onClickBack } = props;
  console.log("todos",todos);
  return (
    <div className="complete-area">
      <p className="title">完了したTODO</p>
      <ul>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="list-row">
              <li>{todo.name}</li>
              <button onClick={() => onClickBack(todo.id)}>戻す</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};