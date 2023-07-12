import {
  IReddidCommentResponse,
  ITwitterCommentResponse,
  IUserComment,
} from "../@types";

export const userCommentsSerializer = {
  serializeRedditUserComments: (
    items: IReddidCommentResponse[]
  ): IUserComment[] => {
    return items.map((item: IReddidCommentResponse) => {
      return {
        id: item.id,
        content: item.content,
        author: `${item.author.firstName} ${item.author.lastName}`,
        source: item.source,
        date: item.date,
      };
    });
  },
  serializeTwitterUserComments: (
    items: ITwitterCommentResponse[]
  ): IUserComment[] => {
    return items.map((item: ITwitterCommentResponse) => {
      return {
        id: item.id,
        content: item.content,
        author: item.author,
        source: item.source,
        date: item.date,
      };
    });
  },
};
