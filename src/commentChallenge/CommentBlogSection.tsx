import React, { useState, useEffect } from 'react';
import { deleteComment, editComment, listComments } from '../services/comments';
import styles from "./CommentBlogSection.module.scss"

const CommentBlogSection: React.FC = () => {
  const [data, setData] = useState<{
    id: string;
    content: string;
    author: string;
    source: string;
  }[]>([]);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  }>(); // user data shouldn't be in component state, but in app wide store (useContext or redux...)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const loadData = async () => {
    setIsLoading(true)
    setError('')
    try {
      const comments = await listComments(["reddit", "twitter"])
      setData(comments)
    } catch (err) {
      setError("Error fetching comment data")
    } finally {
      setIsLoading(false)
    }
  };

  const handleDeleteComment = async (id: string, source: string) => {
    setIsLoading(true);
    setError('')
    try {
      await deleteComment(id, source);
      const updatedData = data.filter((comment) => comment.id !== id)
      setData(updatedData);
    } catch (err) {
      setError('Error deleting comment.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditComment = async (id: string, content: string, source: string) => {
    setIsLoading(true);
    setError('')
    try {
      const newComment = await editComment(id, content, source);
      const updatedData = data.map((comment) => {
        if (comment.id === id) {
          return newComment;
        }
        return comment;
      })
      setData(updatedData);
    } catch (err) {
      setError('Error editing comment.');
    } finally {
      setIsLoading(false);
    }
  };

  const sortData = (data: any) => {
    // Simulating an expensive sorting operation
    return data.sort((a: any, b: any) => a.value - b.value);
  };

  useEffect(() => {
    loadData();
  }, []);

  const sortedData = sortData(data);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Comments</h2>
          {
            sortedData.map((item: {
              id: string;
              content: string;
              author: string;
              source: string
            }) => (
              <div key={item.id}>
                <h4>{item.author}</h4>
                <p>{item.content}</p>
                <button onClick={() => handleDeleteComment(item.id, item.source)}>Delete</button>
                <button onClick={() => handleEditComment(item.id, 'New Content', item.source)}>Edit</button>
              </div>
            ))
          }
        </>
      )}
    </div>
  );
};

export default CommentBlogSection;
