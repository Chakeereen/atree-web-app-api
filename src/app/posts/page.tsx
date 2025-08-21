// app/posts/page.tsx
'use client';

import { useState, useEffect } from 'react';

// กำหนด Type ของ Post ให้ตรงกับ Schema
interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PostsPage() {
  // State สำหรับเก็บข้อมูล posts
  const [posts, setPosts] = useState<Post[]>([]);
  // State สำหรับจัดการสถานะการโหลด
  const [loading, setLoading] = useState<boolean>(true);
  // State สำหรับจัดการข้อผิดพลาด
  const [error, setError] = useState<string | null>(null);

  // useEffect จะทำงานเมื่อ component ถูก render ครั้งแรก
  useEffect(() => {
    // สร้างฟังก์ชัน async ภายใน useEffect เพื่อดึงข้อมูล
    const fetchPosts = async () => {
      try {
        // เรียก API endpoint ที่เราสร้างไว้
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data: Post[] = await response.json();
        setPosts(data); // เก็บข้อมูลที่ได้ใน state
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      } finally {
        setLoading(false); // หยุดการโหลดเมื่อเสร็จสิ้น
      }
    };

    fetchPosts();
  }, []); // dependency array เป็น [] หมายถึงให้รันแค่ครั้งเดียว

  // แสดงสถานะการโหลด
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading posts...</p>
      </div>
    );
  }

  // แสดงข้อผิดพลาด
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  // แสดงผลข้อมูล posts
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 border-b pb-2">All Posts</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content || 'No content available.'}</p>
              <div className="text-sm text-gray-400">
                <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                <p>Last Updated: {new Date(post.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No posts found.</p>
      )}
    </main>
  );
}
