"use client"
import React,{useState,useCallback, useMemo, useRef,} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

const page = () => {
  const [title,setTitle] = useState("")
  const [value, setValue] = useState('');
  // Editor ref
  const quill = useRef();
  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      // syntax: true,
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1,2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "blockquote","strike"],
          [{ color: [] }, { background: [] }],
          [{ script:  "sub" }, { script:  "super" }],
          ["code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image","video"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

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
    <main className="p-3">      
      <div className="mb-2">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="capitalize w-full h-10 border focus:outline-none px-2"/>
      </div>
      <div className="relative">
        <ReactQuill ref={(el) => (quill.current = el)} theme="snow" value={value} onChange={setValue} formats={formats}
          modules={modules} style={{height:"50vh",position:"relative"}} />
      </div>

      <button className="text-white font-bold bg-red-600 mt-16 w-full py-2" onClick={submitPost}>Submit</button>
  </main>
  )
}

export default page