import { useState } from "react";
import { sourceRedditUrl, sourceTwitterUrl } from "../config";
import { userCommentsSerializer } from "../serializer";
import { IUserComment } from "../@types";

export const useCommentsService = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getComments = async (): Promise<IUserComment[] | { error: string }> => {
    try {
      setIsLoading(true);
      let [redditResponse, twitterResponse] = await Promise.all([
        fetch(sourceRedditUrl),
        fetch(sourceTwitterUrl),
      ]);
      const reddit = await redditResponse.json();
      const twitter = await twitterResponse.json();

      if (reddit && twitter) {
        return [
          ...userCommentsSerializer.serializeRedditUserComments(reddit),
          ...userCommentsSerializer.serializeTwitterUserComments(twitter),
        ];
      } else {
        return { error: "Reddit or Twitter data is missing." };
      }
    } catch (error) {
      return { error: "Error fetching data." };
    } finally {
      setIsLoading(false);
    }
  };

  //   HERE IS WHERE I STOPED
  const deleteComment = async (id: string, source: string) => {
    try {
      setIsLoading(true);
      await fetch(
        `${source === "twitter" ? sourceTwitterUrl : sourceRedditUrl}/${id}`,
        {
          method: "DELETE",
        }
      );
      setUserComments((prevData) =>
        prevData.filter((comment) => comment.id !== id)
      );
      setIsLoading(false);
    } catch (error) {
      setError("Error deleting comment.");
      setIsLoading(false);
    }
  };

  const editComment = async (id: string, content: string, source: string) => {
    try {
      setIsLoading(true);
      await fetch(
        `${source === "twitter" ? sourceTwitterUrl : sourceRedditUrl}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );
      setUserComments((prevData) =>
        prevData.map((comment) => {
          if (comment.id === id) {
            return { ...comment, content };
          }
          return comment;
        })
      );
      setIsLoading(false);
    } catch (error) {
      setError("Error editing comment.");
      setIsLoading(false);
    }
  };

  return {
    getComments,
    deleteComment,
    editComment,
    isLoading,
  };
};
