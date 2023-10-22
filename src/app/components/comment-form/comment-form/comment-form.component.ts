import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
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
    if (this.commentForm.valid) {
      // Handle the form submit logic
      console.log(this.commentForm.value);
      this.commentForm.reset();
    }
  }
}
