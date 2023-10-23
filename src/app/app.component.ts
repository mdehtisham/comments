import { Component, OnInit } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { CommentInterface, FormInputInterface } from './types/comments.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'comments';
  comments: CommentInterface[] = []
  constructor(private commentService : CommentsService){}


  ngOnInit(): void {
    this.commentService.getComments().subscribe(comments => {
      console.log('got these values', comments)
      this.comments = comments
    })
  }


  handleSubmit(formVal:FormInputInterface){
    const formValData : CommentInterface | null = this.prepareFormVal(formVal)
    this.comments.push(formValData)
    console.log('form value', formValData)
  }

  prepareFormVal(formVal:FormInputInterface){
    return {
      id: '1',
    body: formVal.comment,
    username: formVal.name,
    uderId: formVal.name.toLocaleLowerCase(),
    parentId: '1',
    createdAt: new Date().toISOString()
    }
  }
}
