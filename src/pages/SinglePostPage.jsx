import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config/api";

function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await fetch(
          `${API_URL}/api/posts/${id}`,
        );
        const postData = await postResponse.json();
        setPost(postData.post);

        const commentsResponse = await fetch(
          `${API_URL}/api/comments/${id}`,
        );
        const commentsData = await commentsResponse.json();
        setComments(commentsData.comments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to comment");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      const data = await response.json();

      if (data.success) {
        setComments([...comments, data.newComment]);
        setNewComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
        </div>
      ))}

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default SinglePostPage;
