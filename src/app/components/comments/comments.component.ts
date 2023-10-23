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
  @Input() currentUserId!: string|null|undefined;
  activeComment: ActiveCommentInterface | null = null;
  @Output() addComment = new EventEmitter<FormInputInterface | null>()
  @Output() updateCommentData = new EventEmitter<FormInputInterface | null>()
  @Output() handleDelete = new EventEmitter<string>()



  getReplies(commentId: string|null|undefined){
    return this.comments.filter(comment => comment.parentId === commentId)
    .sort((a,b) => new Date(a.createdAt).getMilliseconds() - new Date(b.createdAt).getMilliseconds())
  }

  setActiveComment(activeComment: ActiveCommentInterface | null): void{
    this.activeComment = activeComment;
  }

}
