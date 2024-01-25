import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PostsService } from '../posts.service';
import { PostListComponent } from '../post-list/post-list.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../../../model/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    PostListComponent],
  templateUrl: `./post.component.html`,
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  entryTitle = "";
  entryContent = "";
  post: Post = { id: '', title: '', content: '' };
  private mode = 'create';
  private postId: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.postsService.getPost(this.postId).subscribe(postData => {
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content
            };
          });
        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    };
    this.postsService.addPost(form.value.title, form.value.content); // Fix: Pass only two arguments
    form.resetForm();
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.mode === 'create') {
    this.postsService.addPost(form.value.content, form.value.title);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content);
    }
    form.resetForm();
  }
}
