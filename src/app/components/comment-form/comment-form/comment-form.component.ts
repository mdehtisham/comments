import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommentInterface, FormInputInterface } from '../../types/comments.interface';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() submitLabel!: string;
  @Input() hasCancelButton: boolean = false;
  @Input() editingData: CommentInterface | null = null;
  @Input() isMainForm: boolean = false;
  @Output() handleSubmit = new EventEmitter<FormInputInterface>();
  @Output() onCancelClick = new EventEmitter<Boolean>();
  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          this.nameLengthValidator,
          this.forbiddenCharactersValidator,
        ],
      ],
      comment: [
        '',
        [
          Validators.required,
          this.commentLengthValidator,
          this.forbiddenCharactersValidator,
        ],
      ],
    });
  }

  ngOnInit(): void {
    if(this.editingData){
      this.commentForm.patchValue({name: this.editingData.username, comment: this.editingData.body})
    }
  }

  nameLengthValidator(control: { value: string }) {
    const name = control.value;
    if (name && name.length < 3) {
      return { nameLength: true };
    }
    return null;
  }

  commentLengthValidator(control: { value: string }) {
    const comment = control.value;
    if (comment && comment.length < 5) {
      return { commentLength: true };
    }
    return null;
  }

  forbiddenCharactersValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const forbiddenPattern = /[<>]/; // Regular expression to check for < and >
    const value = control.value;
    const forbidden = forbiddenPattern.test(value);

    if (forbidden) {
      return { forbiddenCharacters: true };
    }

    return null;
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.handleSubmit.emit({
        name: this.commentForm.value.name,
        comment: this.commentForm.value.comment,
        id: this.editingData?.id ? this.editingData?.id :  `${Date.now()}`,
      });
      this.commentForm.reset();
      if(this.editingData?.id){
        this.onCancelClick.emit(true)
      }
    }
  }

  handleCancel() {
    this.commentForm.reset();
    this.onCancelClick.emit(true);
  }
}
