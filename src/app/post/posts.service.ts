import { Injectable } from "@angular/core";
import { Post } from "../../../model/post.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];  // array of Post objects
  private postsUpdated = new Subject<Post[]>();  // Subject is a special type of Observable

  constructor(private http: HttpClient) { }  // inject HttpClient

  getPosts() {
    this.http.get<{ message: string, posts: any }>(
      'http://localhost:3000/api/posts'
      ) // get request
    .pipe(map((postData) => {  // map the response
      return postData.posts.map((post: any) => {  // explicitly define the type of 'post'
        return {  // return a new object
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))  // end map()
      .subscribe((transformedPost) => {  // subscribe to the Observable
      this.posts = transformedPost;
      this.postsUpdated.next([...this.posts]);
    });  // end subscribe()
  }  // end getPosts()

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();  // return the Observable
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};
    this.http
    .post<{postId: string, message: string, posts: Post}>('http://localhost:3000/api/posts', post) // post request
    .subscribe((responseData) => {
      const id = responseData.postId; // get the id from the response
      post.id = id; // set the id of the post object
      this.posts.push(post); // add the new post to the array
      this.postsUpdated.next([...this.posts]); // emit the new post
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/' + id, post) // put request
    .subscribe(response =>
      {
        const updatedPosts = [...this.posts]; // copy the posts array
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id); // find the index of the post
        updatedPosts[oldPostIndex] = post; // update the post
        this.posts = updatedPosts; // update the posts array
        this.postsUpdated.next([...this.posts]); // emit the updated posts
      });
  };

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId) // delete request
    .subscribe(() => {
      const updatedPosts = this.posts.filter(
        post => post.id !== postId); // filter out the deleted post
      this.posts = updatedPosts; // update the posts array
      this.postsUpdated.next([...this.posts]); // emit the updated posts
    });
  }

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>(
      `http://localhost:3000/api/posts/${id}`)
      .pipe(
        map(responseData => {
          // additional type checking if necessary
          return responseData;
        })
      );
  }

  // ... other methods ...

}
