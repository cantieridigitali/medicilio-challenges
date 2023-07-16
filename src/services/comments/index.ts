import {
  listRedditComments,
  deleteRedditComment,
  editRedditComment,
} from "./sources/reddit";
import {
  listTwitterComments,
  deleteTwitterComment,
  editTwitterComment,
} from "./sources/twitter";

const sourceMap: any = {
  reddit: {
    list: listRedditComments,
    delete: deleteRedditComment,
    edit: editRedditComment,
  },
  twitter: {
    list: listTwitterComments,
    delete: deleteTwitterComment,
    edit: editTwitterComment,
  },
};

export const listComments = async (sources: string[]) => {
  const callbacks = [...sources.map((src) => sourceMap[src].list())];
  const results = await Promise.all(callbacks);
  return results.flat();
};

export const deleteComment = async (id: string, source: string) => {
  const response = await sourceMap[source].delete(id);
  return response;
};

export const editComment = async (
  id: string,
  newComment: string,
  source: string
) => {
  const response = await sourceMap[source].edit(id, newComment);
  return response;
};
