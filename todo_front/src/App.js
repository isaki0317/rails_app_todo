import React, { useReducer, useState, useEffect } from "react";
import axios from 'axios';
import "./styles.css";
import { InputTodos } from "./components/inputTodos";
import { IncompleteTodos } from "./components/incompleteTodos";
import { CompleteTodos } from "./components/completeTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  //stateに定義して利便性を上げる
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //inputに入力された値をsetTodoTextにセット
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    axios.post('/issues',
    { name: todoText }
    ).then(response => {
      console.log("registration response", response.data)
      const newTodos = [...incompleteTodos, response.data];
      setIncompleteTodos(newTodos);
    })
    setTodoText("");
  };

  //削除ボタンが押された時の実行処理
  const onClickDelete = (todo_id) => {
    axios.delete(`/issues/${todo_id}`)
    // setIncompleteTodos(newTodos);
    .then(response => {
      //todo_idと一致するtodoのみreturnしない
      setIncompleteTodos(incompleteTodos.filter(x => x.id !== todo_id))
      console.log("set")
    }).catch(data =>  {
      console.log(data)
    })
  };

  //完了ボタンが押された時の実行処理
  const onClickComplete = (todo_id) => {
    axios.patch(`/issues/${todo_id}`)
    .then(response => {
      setIncompleteTodos(incompleteTodos.filter(x => x.id !== todo_id))
      setCompleteTodos([...completeTodos, response.data]);
      console.log("aaa",completeTodos);
    }).catch(data =>  {
      console.log(data)
    })
  };

  //戻すボタンが押された時の実行処理
  const onClickBack = (todo_id) => {
    axios.patch(`/issues/${todo_id}`)
    .then(response => {
      const newIncompleteTodos = [...incompleteTodos, response.data];
      setCompleteTodos(completeTodos.filter(x => x.id !== todo_id))
      setIncompleteTodos(newIncompleteTodos);
    }).catch(data =>  {
      console.log(data)
    })
  };

  useEffect(() => {
    axios.get('/issues')
    .then((response) => {
      console.log("index/response",response.data);
      console.log("index/incomplete",response.data.incompleteTodos);
      setIncompleteTodos(response.data.incompleteTodos);
      console.log("index/complete",response.data.completeTodos);
      setCompleteTodos([...response.data.completeTodos]);
    })
    .catch((data) =>{
      console.log(data)
    })
  }, []);

  return (
    <div className="body">
      {/* コンポーネント化して、propsを渡す */}
      <InputTodos
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        //5を超えた時点でtrueが渡る
        disabled={incompleteTodos.length >= 10}
      />
      {/* Todoが５個以上の場合だけ右辺が実行 */}
      {incompleteTodos.length >= 10 && (
        <p style={{ color: "red", textAlign: "center" }}>
          登録できるtodo5個までだよ～。消化しよう!
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </div>
  );
};
