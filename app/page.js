"use client"
import React,{useState,useEffect} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from "highlight.js";
import axios from "axios";
export default function Home() {
  const [title,setTitle] = useState("")
  const [value, setValue] = useState('');
  // Editor ref
 const getPost =async()=>[
  await axios.get("")
  .then((data)=>{
    console.log(data)
  })
  .catch((err)=>{
    console.log(err)
  })
 ]
 useEffect(()=>{

 },[])

  return (
    <main className="p-3">
      
     
    </main>
  );
}
