import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveCommentInterface, CommentInterface, FormInputInterface } from '../types/comments.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() comments!: CommentInterface[];
  newComment: string = '';
  @Input() currentUserId!: string|null|undefined|symbol;
  activeComment: ActiveCommentInterface | null = null;
  @Output() addComment = new EventEmitter<FormInputInterface | null>()



  getReplies(commentId: string|null|undefined|symbol){
    return this.comments.filter(comment => comment.parentId === commentId)
    .sort((a,b) => new Date(a.createdAt).getMilliseconds() - new Date(b.createdAt).getMilliseconds())
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void{
    this.activeComment = activeComment;
  }

}
