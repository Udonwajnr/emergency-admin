"use client"
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Articles = () => {
  const router = useRouter()
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://emergency-backend-api.onrender.com/api/post')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log('Edit article with ID:', id);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    console.log('Delete article with ID:', id);
  };

  return (
    <Container>
        <div className="flex justify-end p-2">
            <button 
                    onClick={() =>router.push("/editor")} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >Create Post</button>
        </div>
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="font-bold text-3xl text-center">Emergency Precautions and Measures</h1>
        {articles.map(article => (
            <div key={article._id} className="mb-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{article.title}</h2>
            <div 
                className="prose prose-lg text-gray-700 mb-4" 
                dangerouslySetInnerHTML={{ __html: article.article }} 
            />
            <div className="flex space-x-4">
                <Link 
                href={`editor/${article._id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                Edit
                </Link>

                <Link 
                href={`editor/delete/${article._id}`}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                Delete
                </Link>
            </div>
            </div>
        ))}
        </div>
    </Container>
  );
};

export default Articles;
