import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommentInterface } from '../components/types/comments.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  getComments(): Observable<CommentInterface[]>{
    return this.httpClient.get<any>('assets/comments.json').pipe(
      map(data => data.comments)
    );
  }
}
