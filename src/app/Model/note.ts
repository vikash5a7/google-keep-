export interface Note {
  isTrash: any;
  id: string;
  title: string;
  description: string;
  isTrashed: boolean;
  pinned: boolean;
  isArchieved: boolean;
  colour: string;
  reminder: Date;
  createdDateAndTime: string;
  upDateAndTime: string;
  userId: number;
  imgUrl: string;
}
