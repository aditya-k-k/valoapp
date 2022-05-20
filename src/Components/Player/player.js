import React from 'react'
import './player.css'
import { useState,useEffect } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Player(props) {
    const[rank,getrank]=useState("not loaded")
    const[valorank,setvalorank]=useState("notloaded")
    const [progress, setProgress] = useState(0);


    async function getRank() {
        const response = await fetch("/api/getrank", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({ user:props.username.split("#")[0],id:props.username.split("#")[1]}),
          // *GET, POST, PUT, DELETE, etc.
        });
        const data = await response;
        let a = await data.text();
        console.log(a);
        //props.fun()
        console.log(data.status)
        if(data.status===400){
        
            if(a==='Request failed with status code 500.'){
                a='unranked - 0RR'
            }  
        }
        if(data.status===200){
            if(a==='Request failed with status code 500.'){
                a='unranked - 0RR'
            } 
            if(a==='null - nullRR.'){
                a='Compi Locked 0RR'
            }  
        }
        getrank(a)
        const onlyrank=a.split(' ')[0]+a.split(' ')[1]
        setvalorank(onlyrank)
        let ranknum = isNaN(parseInt(a.split(' ')[3]))?  0 :parseInt(a.split(' ')[3]);
        setProgress(ranknum)
      }

    // async function getRank(){
    //    console.log(`https://api.kyroskoh.xyz/valorant/v1/mmr/ap/${props.username.split("#")[0]}/${props.username.split("#")[1]}`) 
    //   const response = await fetch(`https://api.kyroskoh.xyz/valorant/v1/mmr/ap/${props.username.split("#")[0]}/${props.username.split("#")[1]}`, {
    //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
    // });
    // const data=await response
    // let a=await data.text()
    // console.log(a)
    
    // }

    useEffect(()=>{
        getRank();
    },[])

  return (
    <div className="box">
            <div className="upper">
                <div className="name">
                    {props.username}        
                </div>
                <div className="img1">
                    <img src={require(`../../assets/${valorank}.png`)} alt=""/>
                    {rank}
                </div>
            </div>
            <div className="middle" style={{width:`${progress}%`}}>
            </div>
            <div className="lower">
                <CopyToClipboard text={props.usr}>
                <button>Username</button>
                </CopyToClipboard>


                <CopyToClipboard text={props.pwd}>
                <button>Password</button>
                </CopyToClipboard>

                <CopyToClipboard text={props.usr + " " + props.pwd}>
                <button>Both</button>
                </CopyToClipboard>

            </div>
        </div>
    
  )
}

