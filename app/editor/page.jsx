"use client"
import React,{useState} from "react";
import axios from "axios";
import Container from "../components/Container";

const Page = () => {
  const [title,setTitle] = useState("")
  const [value, setValue] = useState('');
 
  const submitPost =async()=>{
    await axios.post("https://emergency-backend-api.onrender.com/api/post",{title,article:value})
    .then((data)=>{
    console.log(data)
    alert("submitted")
    setTitle("")
    setValue("")
  })
  .catch((err)=>{
    console.log(err)
  })
   }

   console.log({title,article:value})

  return (
    <Container>
      <main className="p-3">      
        <div className="mb-2">
          <label>Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="capitalize w-full h-10 border focus:outline-none px-2"/>
        </div>
        <div className="relative">
        <label htmlFor="">Article</label>
        <textarea 
          class="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400"
          placeholder="Enter your text here...">
        </textarea>
        </div>

        <button className="text-white font-bold bg-red-600 mt-16 w-full py-2" onClick={submitPost}>Submit</button>
      </main>

    </Container>
  )
}

export default Page