export interface DashBoardInterface {
  _id: string;
  name: string;
  email: string;
  userSubmissions: UserSubmission[];
  numberOfSubmissions: number;
}

export interface UserSubmission {
  _id: string;
  totalScore: number;
  createdAt: Date;
  updatedAt: Date;
}
