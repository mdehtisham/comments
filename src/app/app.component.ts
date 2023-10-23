import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  constructor(private commentService : CommentsService, private cdr: ChangeDetectorRef){}


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
        this.setToLocalStorage()
      })
    }
  }

  handleSubmit(event: {formVal: FormInputInterface, parentId: string|null}): void{
    const {formVal, parentId} = event;
    const formValData : CommentInterface | null = this.prepareFormVal(formVal, parentId)
    this.comments.push(formValData)
    this.setToLocalStorage()
  }

  prepareFormVal(formVal:FormInputInterface,  parentId: null|string|undefined = null){
    const uniqueId = `${Date.now()}`;
    return {
      id: formVal.id || uniqueId,
      body: formVal.comment,
      username: formVal.name,
      userId: formVal.name.toLocaleLowerCase() || uniqueId,
      parentId: parentId ? parentId : null,
      createdAt: new Date().toISOString()
    }
  }

  addComment(value: FormInputInterface | null){
    if(value){
      const tempVal = this.prepareFormVal({name: value.name, comment: value.comment, id: value.id}, value.parentId)
      this.comments.push(tempVal)
      this.setToLocalStorage()
    }
  }
  handleUpdateComment(value: FormInputInterface | null){
    if(value){
      const tempVal = this.prepareFormVal({name: value.name, comment: value.comment, id: value.id}, value.parentId)
      this.comments = this.comments.map(comment => {
        if(comment.id === value.id){
          comment = {...comment, ...tempVal}
        }
        return comment;
      })
      this.setToLocalStorage()
    }
  }
  handleDeleteComment(commentId: string){
    this.comments = this.comments.filter(comment => comment.id != commentId)
    this.setToLocalStorage()
  }

  handleClearAll(){
    this.comments = []
    this.setToLocalStorage()
  }

  handleSetToDefault(){
    this.handleFetchingComments()
  }

  setToLocalStorage(){
    this.cdr.detectChanges()
    localStorage.setItem('comments', JSON.stringify(this.comments))
  }


}