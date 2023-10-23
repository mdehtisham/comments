import { ActiveCommentTypeEnum } from "./activeCommentType.enum";

export interface CommentInterface{
    id: string | symbol | null | undefined;
    body: string;
    username: string;
    userId: string | symbol;
    parentId: null|string|symbol|undefined;
    createdAt: string;
}

export interface FormInputInterface{
    name: string;
    comment: string;
    parentId?: string|null|undefined|symbol;
    id?: symbol|undefined|null;
}
export interface ActiveCommentInterface{
    id: string|null|undefined|symbol;
    type: ActiveCommentTypeEnum;
}