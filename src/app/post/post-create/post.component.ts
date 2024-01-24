import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: `./post.component.html`,
  styleUrl: './post.component.css'
})
export class PostComponent {
  entryTitle = "";
  entryContent = "";

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postsService.addPost(form.value.content, form.value.title);
    form.resetForm();
  }
}
