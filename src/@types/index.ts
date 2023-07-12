export interface IReddidCommentResponse {
  id: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
  };
  source: string;
  date: Date;
}

export interface ITwitterCommentResponse {
  id: string;
  content: string;
  author: string;
  source: string;
  date: Date;
}

export interface IUserComment {
  id: string;
  content: string;
  author: string;
  source: string;
  date: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}
