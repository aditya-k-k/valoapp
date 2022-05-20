import React from "react";
import '../PlayerForm/playerForm.css'
export default function PlayerForm(props) {
  async function putRank(UserID,Username,Password) {
    const response = await fetch("/api/addplayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ UserID,Username,Password}),
      // *GET, POST, PUT, DELETE, etc.
    });
    const data = await response;
    const a = await data.text();
    console.log(a);
    if(a==="already added"){
      alert("Player Exsist")
      return;
    }
    props.fun()
  }

  async function fetchdata(e){
    e.target[3].disabled="disabled"
    e.target[3].innerText="wait"
    e.preventDefault();
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    console.log(e.target[2].value)
    const response = await fetch("/api/getrank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ user:e.target[0].value.split("#")[0],id:e.target[0].value.split("#")[1]}),
      // *GET, POST, PUT, DELETE, etc.
    });
  const data=await response
  const a=await data.text()
  console.log(a)
  if(data.status===200){
      if(a==='Request failed with status code 404.'){
          alert("Wrong account")
          e.target[3].disabled=false
          e.target[3].innerText="Add Player"
          return;
      }
      if(a==='Request failed with status code 400.'){
        alert("Wrong UserID ")
        e.target[3].disabled=false
        e.target[3].innerText="Add Player"
        return;
    }
  }
    putRank(e.target[0].value,e.target[1].value,e.target[2].value)
    e.target[3].disabled=false
    e.target[3].innerText="Add Player"
  }

  return (
    
      <form className="box" onSubmit={fetchdata}>
      <div className="upper1">
        <div>
          <label htmlFor="">Valorant ID</label>
          <input type="text" id="userid" name="userid" required/>
        </div>
      </div>
      <div className="middle1">
        <div>
          <label htmlFor="">Username</label>
          <input type="text" id="username" name="username" required/>
        </div>
      </div>
      <div className="lower1">
        <div>
          <label htmlFor="">Password</label>
          <input type="text" id="password" name="password" required/>
        </div>
      </div>
      <div className="lowest">
        <button type="SUBMIT">Add Player</button>
      </div>
    </form>
  );
}

