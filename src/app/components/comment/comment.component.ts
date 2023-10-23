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
  @Input() currentUserId !: string ;
  @Input() parentId !: string | null | undefined;
  @Input() replies: CommentInterface[] = []
  @Input() activeComment!: ActiveCommentInterface | null; 
  activeCommentType = ActiveCommentTypeEnum;
  @Output() setActiveComment = new EventEmitter<ActiveCommentInterface | null>()
  @Output() addComment = new EventEmitter<FormInputInterface | null>()
  @Output() updateCommentData = new EventEmitter<FormInputInterface | null>()
  @Output() handleDelete = new EventEmitter<string>()
  replyId: string | null | undefined = null;

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
  isEditing(): boolean{
    if(!this.activeComment){
      return false
    }
    return this.activeComment.id === this.comment.id && this.activeComment.type === this.activeCommentType.editing
  }

  handleSubmit(event: FormInputInterface){
    this.addComment.emit({...event, parentId: this.replyId})
  }
  updateComment(event: FormInputInterface){
    this.updateCommentData.emit({...event, id: event.id})
  }
  handleCancel(){
    this.setActiveComment.emit(null)
  }
  onDelete(){
    this.handleDelete.emit(this.comment.id as string)
  }
}
