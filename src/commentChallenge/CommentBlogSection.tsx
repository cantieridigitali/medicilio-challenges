import { useState, useEffect } from "react";
import { IUser, IUserComment } from "../@types";
import { useCommentsService, useWindowWidth } from "../hooks";

const CommentBlogSection: React.FC = () => {
  const { isMobile } = useWindowWidth();
  const { getComments, deleteComment, editComment, isLoading } =
    useCommentsService();

  const [userComments, setUserComments] = useState<IUserComment[]>([]);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<IUser>();

  const retrieveUserComments = async () => {
    const response = await getComments();
    if ("error" in response) {
      setError(response.error);
    } else {
      setUserComments(response);
    }
  };

  const sortData = (data: IUserComment[]) => {
    return data.sort(
      (a: IUserComment, b: IUserComment) => Number(a.date) - Number(b.date)
    );
  };

  const sortedData = sortData(userComments);

  useEffect(() => {
    retrieveUserComments();
  }, []);

  const renderData = () => {
    if (isMobile) {
      return sortedData.map((item: IUserComment) => (
        <div key={item.id}>
          <h4>{item.author}</h4>
          <p>{item.content}</p>
          <button onClick={() => deleteComment(item.id, item.source)}>
            Delete
          </button>
        </div>
      ));
    } else {
      return sortedData.map((item: IUserComment) => (
        <div key={item.id}>
          <h4>{item.author}</h4>
          <p>{item.content}</p>
          <button onClick={() => deleteComment(item.id, item.source)}>
            Delete
          </button>
          <button
            onClick={() => editComment(item.id, "New Content", item.source)}
          >
            Edit
          </button>
        </div>
      ));
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
