import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function BlogPage() {
    
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
      const fetchPosts = async () =>{
        try {
          const response = await fetch("http://localhost:8000/api/posts");
          const data = await response.json();
          // console.log(data);
          setPosts(data.posts)
        } catch (error) {
          console.log(error);
        } finally{
          setIsLoading(false);
        }
      };
      fetchPosts();
    },[]);
    if (isLoading) return <p>Loading posts...</p>;
  return (
    <div>
      <h2>My Blog</h2>
      {
        posts.map((post)=>(
          <div key={post._id}>
          <h3>
            <Link to={`/blog/${post._id}`}>{post.title}</Link>
          </h3>
          <p>{post.category}</p>
          </div>
        ))
      }
    </div>
  )
}

export default BlogPage;
