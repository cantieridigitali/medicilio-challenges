import React, { useState, useEffect } from 'react';
import styles from "./CommentBlogSection.module.scss"

const sourceRedditUrl = 'http://localhost:3001/reddit'; // Constant for API URL
const sourceTwitterUrl = 'http://localhost:3001/twitter'; // Constant for API URL

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

  const fetchRedditData = async () => {
    const response = await fetch(sourceRedditUrl);

    const result = await response.json();
    const serializedResponse = result.map((item: any) => ({
      id: item.id,
      content: item.content,
      source: 'reddit',
    }));
    return serializedResponse;
  };


  const fetchTwitterData = async () => {
    const response = await fetch(sourceTwitterUrl);

    const result = await response.json();
    const serializedResponse = result.map((item: any) => ({
      id: item.id,
      content: item.twitter_content,
      source: 'twitter',
    }));
    return serializedResponse;
  };

  const deleteComment = async (id: string, source: string) => {
    try {
      setIsLoading(true);
      await fetch(`${source === 'twitter' ? sourceTwitterUrl : sourceRedditUrl}/${id}`, {
        method: 'DELETE',
      });
      setData((prevData) => prevData.filter((comment) => comment.id !== id));
      setIsLoading(false);
    } catch (error) {
      setError('Error deleting comment.');
      setIsLoading(false);
    }
  };

  const editComment = async (id: string, content: string, source: string) => {
    try {
      setIsLoading(true);
      await fetch(`${source === 'twitter' ? sourceTwitterUrl : sourceRedditUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      setData((prevData) =>
        prevData.map((comment) => {
          if (comment.id === id) {
            return { ...comment, content };
          }
          return comment;
        })
      );
      setIsLoading(false);
    } catch (error) {
      setError('Error editing comment.');
      setIsLoading(false);
    }
  };

  const loadData = async () => {
    setIsLoading(true)
    setError('')

    try {

      const redditData = await fetchRedditData();
      const twitterData = await fetchTwitterData();

      console.log(redditData, twitterData);

      setData([...redditData, ...twitterData])
    } catch {
      setError("Error fetching comment data")
    } finally {
      setIsLoading(false)
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
                <button onClick={() => deleteComment(item.id, item.source)}>Delete</button>
                <button onClick={() => editComment(item.id, 'New Content', item.source)}>Edit</button>
              </div>
            ))
          }
        </>
      )}
    </div>
  );
};

export default CommentBlogSection;
