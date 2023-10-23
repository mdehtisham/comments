import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActiveCommentInterface, CommentInterface, FormInputInterface } from '../types/comments.interface';
import { ActiveCommentTypeEnum } from '../types/activeCommentType.enum';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  canReply = false;
  canEdit = false;
  canDelete = false;
  @Input() comment!: CommentInterface;
  @Input() currentUserId !: string | symbol;
  @Input() parentId !: string | null;
  @Input() replies: CommentInterface[] = []
  @Input() activeComment!: ActiveCommentInterface | null; 
  activeCommentType = ActiveCommentTypeEnum;
  @Output() setActiveComment = new EventEmitter<ActiveCommentInterface | null>()
  @Output() addComment = new EventEmitter<FormInputInterface | null>()
  replyId: string | null = null;

  ngOnInit(): void {
    this.canReply = Boolean(this.currentUserId);
    this.canEdit = this.currentUserId === this.comment.userId;
    this.canDelete = this.currentUserId === this.comment.userId && !this.replies.length
    this.replyId = this.parentId ? this.parentId : this.comment.id
  }

  isReplying(): boolean{
    if(!this.activeComment){
      return false
    }
    return this.activeComment.id === this.comment.id && this.activeComment.type === this.activeCommentType.replying
  }

  handleSubmit(event: FormInputInterface){
    this.addComment.emit({...event, parentId: this.replyId})
  }

}
