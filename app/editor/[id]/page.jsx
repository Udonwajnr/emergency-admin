"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Container from "@/app/components/Container";
import Link from "next/link";

const EditPost = () => {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    // Fetch the existing post data to pre-fill the form
    axios.get(`https://emergency-backend-api.onrender.com/api/post/${id}`)
      .then((response) => {
        const { title, article } = response.data;
        setTitle(title);
        setValue(article);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
      });
  }, [id]);

  const submitPost = async () => {
    await axios.put(`https://emergency-backend-api.onrender.com/api/post/${id}`, { title, article: value })
      .then((data) => {
        console.log(data);
        alert("Post updated successfully");
        router.push("/post")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <main className="p-3">
        <h2 className="text-3xl font-bold text-center">Edit Post</h2>
        <div className="mb-2">
          <label>Title</label>
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="capitalize w-full h-10 border focus:outline-none px-2" 
          />
        </div>
        <div className="relative">
          <label htmlFor="">Article</label>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400"
            placeholder="Enter your text here..."
          ></textarea>
        </div>
        <button 
          className="text-white font-bold bg-red-600 mt-16 w-full py-2" 
          onClick={submitPost}
        >
          Update Post
        </button>
      </main>
    </Container>
  );
};

export default EditPost;
