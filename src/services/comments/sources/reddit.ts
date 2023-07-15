const baseUrl = 'http://localhost:3001/reddit';

interface redditCommentInterface {
    id: number;
    author_full_name: string;
    created_at: string;
    content: string;
}

const serializeComment = (comment: redditCommentInterface) => ({
    id: comment.id,
    content: comment.content,
    created: comment.created_at,
    source: "reddit",
});

export const listRedditComments = async () => {
    const response = await fetch(baseUrl);

    const result = await response.json();
    const serializedResponse = result.map((item: any) => serializeComment(item));
    return serializedResponse;
};

export const deleteRedditComment = async (id: string) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });

    return response;
};

export const editRedditComment = async (id: string, content: string) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });

    const result = await response.json();
    return serializeComment(result)
};
