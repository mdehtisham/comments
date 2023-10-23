import { Component, Input } from '@angular/core';
import { CommentInterface } from 'src/app/types/comments.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() comments!: CommentInterface[];
  newComment: string = '';
  @Input() currentUserId!: string;

}
