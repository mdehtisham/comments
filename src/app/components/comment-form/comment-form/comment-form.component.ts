import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormInputInterface } from '../../types/comments.interface';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
  @Input() submitLabel!: string;
  @Input() hasCancelButton: boolean = false;
  @Input() initialText: string = '';
  @Output() handleSubmit = new EventEmitter<FormInputInterface>()
  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      name: ['', [Validators.required, this.nameLengthValidator, this.forbiddenCharactersValidator]],
      comment: ['', [Validators.required, this.commentLengthValidator, this.forbiddenCharactersValidator]]
    });
  }

  nameLengthValidator(control: { value: string; }) {
    const name = control.value;
    if (name && name.length < 3) {
      return { 'nameLength': true };
    }
    return null;
  }

  commentLengthValidator(control: { value: string; }) {
    const comment = control.value;
    if (comment && comment.length < 5) {
      return { 'commentLength': true };
    }
    return null;
  }

  forbiddenCharactersValidator(control: AbstractControl): ValidationErrors | null {
    const forbiddenPattern = /[<>]/; // Regular expression to check for < and >
    const value = control.value;
    const forbidden = forbiddenPattern.test(value);

    if (forbidden) {
      return { 'forbiddenCharacters': true };
    }

    return null;
  }

  onSubmit() {
    // Handle the form submit logic
    if (this.commentForm.valid) {
      this.handleSubmit.emit({name: this.commentForm.value.name, comment: this.commentForm.value.comment})
      console.log(this.commentForm.value);
      this.commentForm.reset();
    }
  }
}
