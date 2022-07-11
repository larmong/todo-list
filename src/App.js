/* eslint-disable */

import './App.css';
import {useState} from "react";

function App(props) {
  let [title, setTitle] = useState(['TodoList 완성하기', '리액트 강의 듣기', '타입스크립트 강의 듣기', '프로젝트 주제 정하기']);
  let [today, setToday] = useState(['2022-07-11', '2022-07-10', '2022-07-09', '2022-07-08']);
  let [check, setCheck] = useState([true, false, false, true]);
  let [inputData, setInputData] = useState("");
  let [changeInputData, setChangeInputData] = useState("");
  let [inputVal, setInputVal] = useState("")
  let [editOn, setEditOn] = useState(false);
  let [modal, setModal] = useState(false);
  let [modalNum, setModalNum] = useState(0);
  let [mode, setMode] = useState(true);

  function listPush() {
    if ( !inputData == "" ){
      let titleCopy = [...title];
      let checkCopy = [...check];
      titleCopy.unshift(inputData)
      checkCopy.unshift(false)
      setTitle(titleCopy)
      setCheck(checkCopy)

      // 발행일자(현재 날짜)
      let newDay = new Date();
      let year = newDay.getFullYear();
      let month = ('0' + (newDay.getMonth() + 1)).slice(-2);
      let day = ('0' + newDay.getDate()).slice(-2);
      let dateString = year + '-' + month  + '-' + day;

      let todayCopy = [...today];
      todayCopy.unshift(dateString);
      setToday(todayCopy);
    } else {
      alert("할 일을 입력해주세요!")
    }
    let input = document.getElementById('add-list');
    input.value = null;
  }
  function listEdit() {
    let val = setInputData;
    setInputVal(val)
  }
  function listChage() {
    let titleCopy = [...title];
    titleCopy[modalNum] = changeInputData;
    setTitle(titleCopy)

    setModal(false);
    setEditOn(false);
  }
  function darkMode() {
    setMode(!mode)
    let page = document.querySelector('.App')
    if ( mode == true ){
      page.className += ' dark';
    } else {
      page.classList.remove('dark');
    }
  }

  return (
    <div className="App">
      <header id="header">
        <h1>Todo List</h1>
      </header>
      <section>
        {
          title.map(function (a, i){
            return (
              <div className="list" key={i}>
                <span className={ check[i] === true ? "on check material-icons" : "check material-icons" } onClick={()=>{
                  let checkCopy = [...check];
                  if ( checkCopy[i] === true ){
                    checkCopy[i] = false;
                  } else {
                    checkCopy[i] = true;
                  }
                  setCheck(checkCopy);
                }} >check_circle</span>
                <h3 className={ check[i] === true ? "on" : null }>{ title[i] }</h3>
                <em>{ today[i] }</em>
                <div className="list-icon">
                  <span className="material-icons" onClick={()=>{
                    setModalNum(i);
                    setModal(true);
                    setEditOn(true);
                    setInputVal(title[i])

                  }}> mode_edit_outline </span>
                  <span className="material-icons" onClick={()=>{
                    let titleCopy = [...title];
                    let todayCopy = [...today];
                    let checkCopy = [...check];
                    titleCopy.splice(i, 1)
                    todayCopy.splice(i, 1)
                    checkCopy.splice(i, 1)
                    setTitle(titleCopy)
                    setToday(todayCopy)
                    setCheck(checkCopy)
                  }}> delete </span> </div>
              </div>
            )
          })
        }
        <div className="icon">
          <div className="mode" onClick={ darkMode }>
            {
              mode == true
              ? <span className="dark material-icons"> dark_mode </span>
              : <span className="light material-icons"> light_mode </span>
            }
          </div>
          <div className="add">
            <span className="material-icons" onClick={()=>{
              setModal(true)
              setEditOn(false)
            }}> add </span>
          </div>
        </div>
      </section>

      {
        modal == true
        ? <Modal listPush={listPush} setInputData={setInputData} setModal={setModal} editOn={editOn} inputVal={inputVal} listEdit={listEdit} listChage={listChage} setChangeInputData={setChangeInputData} />
        : null
      }

    </div>
  );
}

function Modal(props){
  return (
    <div className="add-modal">
      <h3>+ Add List</h3>
      <div className="close">
        <span className="material-icons" onClick={ ()=>{ props.setModal(false) } }> close </span>
      </div>
      <div className="modal-cont">
        <label htmlFor="add-list">할 일</label>
        {
          props.editOn == false
          ? <input type="text" id="add-list" onChange={(e)=>{props.setInputData(e.target.value)}}/>
          : <input type="text" id="add-list" value={ props.inputVal } onChange={(e)=>{
            props.listEdit();
            props.setChangeInputData(e.target.value)
          }}/>
        }
        {
          props.editOn == false
          ? <button onClick={ props.listPush }>ADD</button>
          : <button onClick={ props.listChage }>OK</button>
        }
      </div>
    </div>
  )
}

export default App;
