"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Container from "@/app/components/Container";
const DeletePost = () => {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the post data to confirm deletion
    axios.get(`https://emergency-backend-api.onrender.com/api/post/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
      });
  }, [id]);

  const deletePost = async () => {
    await axios.delete(`https://emergency-backend-api.onrender.com/api/post/${id}`)
      .then(() => {
        alert("Post deleted successfully");
        router.push("/post"); // Redirect to the homepage or a different page after deletion
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!post) {
    return (
      <Container>
        <main className="p-3">
          <h2 className="text-3xl font-bold text-center">Loading...</h2>
        </main>
      </Container>
    );
  }

  return (
    <Container>
      <main className="p-3">
        <h2 className="text-3xl font-bold text-center">Delete Post</h2>
        <p className="text-center text-lg">
          Are you sure you want to delete the post titled: <strong>{post.title}</strong>?
        </p>
        <div className="flex justify-center mt-4">
          <button 
            className="text-white font-bold bg-red-600 px-4 py-2 mr-2" 
            onClick={deletePost}
          >
            Delete
          </button>
          <button 
            className="text-white font-bold bg-gray-600 px-4 py-2 ml-2" 
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
        </div>
      </main>
    </Container>
  );
};

export default DeletePost;
