import { Component } from '@angular/core';

interface Comment {
  id: number;
  text: string;
  isEditing: boolean;
}

const sampleComments = [
  { id: 1, text: 'This is a great website!', isEditing: false },
  { id: 2, text: 'Awesome work, team!', isEditing: false },
  { id: 3, text: 'I love the design and functionality.', isEditing: false },
  { id: 4, text: 'Keep up the good work!', isEditing: false },
  { id: 5, text: 'This is really helpful.', isEditing: false }
];

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  comments: Comment[] = sampleComments;
  newComment: string = '';


}
