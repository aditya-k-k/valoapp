import Navbar from './Components/Navbar/navabar.js'
import Player from './Components/Player/player.js'
import './App.css'
import { useEffect, useState } from 'react';
import PlayerForm from './Components/PlayerForm/playerForm.js';

function App() {
  const[player,setplayer]=useState([])

  async function getplayer(){
    const response = await fetch('/api/players', {
      method: 'GET',
      // *GET, POST, PUT, DELETE, etc.
     // no-cors, *cors, same-origin
      // *default, no-cache, reload, force-cache, only-if-cached
    });
    const data=await response.json();
    console.log(data)
    setplayer(data)
  }
  useEffect(()=>{
    getplayer();
  },[])
  return (
    <>
    <body>
    <Navbar/>
    <div className="main">
    {player.map((ele)=>{
      return <Player key={ele.UserID} username={ele.UserID} usr={ele.Username} pwd={ele.Password}/>
    })}
    <PlayerForm fun={getplayer}/>
    </div> 
    </body>
    </>
  );
}

export default App;
