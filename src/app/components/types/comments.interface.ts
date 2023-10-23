import { ActiveCommentTypeEnum } from "./activeCommentType.enum";

export interface CommentInterface{
    id: string;
    body: string;
    username: string;
    userId: string | symbol;
    parentId: string | null;
    createdAt: string;
}

export interface FormInputInterface{
    name: string;
    comment: string;
    parentId?: string|null|undefined;
}
export interface ActiveCommentInterface{
    id: string;
    type: ActiveCommentTypeEnum;
}