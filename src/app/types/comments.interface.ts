export interface CommentInterface{
    id: string;
    body: string;
    username: string;
    uderId: string;
    parentId: string | null;
    createdAt: string;
}

export interface FormInputInterface{
    name: string;
    comment: string;
}