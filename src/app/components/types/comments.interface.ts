import { ActiveCommentTypeEnum } from "./activeCommentType.enum";

export interface CommentInterface{
    id: string | null | undefined;
    body: string;
    username: string;
    userId: string;
    parentId: null|string|undefined;
    createdAt: string;
}

export interface FormInputInterface{
    name: string;
    comment: string;
    parentId?: string|null|undefined;
    id?: string|undefined|null;
}
export interface ActiveCommentInterface{
    id: string|null|undefined;
    type: ActiveCommentTypeEnum;
    parentId?: string|null|undefined;
}