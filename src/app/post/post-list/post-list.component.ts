import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule,
  MatExpansionPanel,
  MatDatepickerModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  CommonModule,
  ],
  templateUrl: `./post-list.component.html`,
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  private postsSub: Subscription = new Subscription();

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts(); // get the posts from the server
    this.postsSub = this.postsService.getPostUpdateListener() // subscribe to the Observable
    .subscribe((posts: Post[])=>{
      this.posts = posts;  // update the posts array
    });
  }

  ngOnDestroy(): void { // lifecycle hook
    this.postsSub.unsubscribe(); // unsubscribe from the Observable
  }

  deletePost(postId: string) {
    this.postsService.deletePost(postId);
  }

  editPost(postId: string, newTitle: string, newContent: string): void {
    this.postsService.editPost(postId, newTitle, newContent);
  }

}
