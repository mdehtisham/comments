import { Component, OnInit } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { CommentInterface, FormInputInterface } from '../app/components/types/comments.interface';

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
    this.handleFetchingComments()
  }


  handleFetchingComments(){
    const comments = localStorage.getItem('comments')
    if(comments){
      this.comments = JSON.parse(comments)
    }else{
      this.commentService.getComments().subscribe(comments => {
        this.comments = comments
        localStorage.setItem('comments', JSON.stringify(this.comments))
      })
    }
  }

  handleSubmit(event: {formVal: FormInputInterface, parentId: string|null}): void{
    const {formVal, parentId} = event;
    const formValData : CommentInterface | null = this.prepareFormVal(formVal, parentId)
    this.comments.push(formValData)
    localStorage.setItem('comments', JSON.stringify(this.comments))
    console.log('form value', formValData)
  }

  prepareFormVal(formVal:FormInputInterface,  parentId: null|string = null){
    const uniqueId = Symbol();
    return {
      id: '1',
    body: formVal.comment,
    username: formVal.name,
    userId: formVal.name.toLocaleLowerCase() || uniqueId,
    parentId: parentId ? parentId : null,
    createdAt: new Date().toISOString()
    }
  }

  addComment(value: FormInputInterface | null){
    if(value){
      const tempVal = this.prepareFormVal({name: value.name, comment: value.comment}, value.parentId)
      this.comments.push(tempVal)
      localStorage.setItem('comments', JSON.stringify(this.comments))
    }
  }
}
