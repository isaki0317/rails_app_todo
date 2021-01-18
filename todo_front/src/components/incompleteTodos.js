import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {/* stateに定義したアロー関数をmapで分割して取り出し、
        map等でレンダリングする際はkeyを定義する*/}
        {todos.map((todo, index) => {
          {console.log(todo);}
          return (
            <div key={todo} className="list-row">
              <li>{todo.name}</li>
              <button onClick={() => onClickComplete(index)}>完了</button>
              {/* 引数を定義する場合はアロー関数を宣言する */}
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};