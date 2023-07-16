const baseUrl = "http://localhost:3001/twitter";

interface twitterCommentInterface {
  id: number;
  author: {
    first_name: string;
    last_name: string;
  };
  created_at: string;
  twitter_content: string;
}

const serializeComment = (comment: twitterCommentInterface) => ({
  id: comment.id,
  content: comment.twitter_content,
  created: comment.created_at,
  source: "twitter",
});

export const listTwitterComments = async () => {
  const response = await fetch(baseUrl);

  const result = await response.json();
  const serializedResponse = result.map((item: any) => serializeComment(item));
  return serializedResponse;
};

export const deleteTwitterComment = async (id: string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  return response;
};

export const editTwitterComment = async (id: string, content: string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ twitter_content: content }),
  });

  const result = await response.json();
  return serializeComment(result);
};
