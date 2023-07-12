import React, { useState, useEffect } from 'react';

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
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const sourceRedditUrl = 'https://api.reddit.com/comments'; // Constant for API URL
  const sourceTwitterUrl = 'https://api.twitter.com/comments'; // Constant for API URL

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

  const sortData = (data: any) => {
    // Simulating an expensive sorting operation
    return data.sort((a: any, b: any) => a.value - b.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchRedditData()
      .then((result) => {
        setData(result);
        return fetch(`${sourceTwitterUrl}`);
      })
      .then((response) => response.json())
      .then((additionalData) => {
        const serializedResponse = additionalData.map((item: any) => ({
          id: item.id,
          content: item.content,
          source: 'twitter',
        }));
        setData((prevData: any) => [...prevData, ...serializedResponse]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data.');
        setIsLoading(false);
      })
  }, []);


  useEffect(() => {
    setIsMobile(windowWidth < 768);
  }, [windowWidth])

  const sortedData = sortData(data);

  const renderData = () => {
    if (isMobile) {
      return sortedData.map((item: {
        id: string;
        content: string;
        author: string;
        source: string;
      }) => (
        <div key={item.id}>
          <h4>{item.author}</h4>
          <p>{item.content}</p>
          <button onClick={() => deleteComment(item.id, item.source)}>Delete</button>
        </div>
      ));
    } else {
      return sortedData.map((item: {
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
      ));
    }
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


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Comments</h2>
          {renderData()}
        </>
      )}
    </div>
  );
};

export default CommentBlogSection;
