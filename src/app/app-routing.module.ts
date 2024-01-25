import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post-create/post.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes: Routes = [
  { path: 'create', component:  PostComponent},
  { path: 'edit/:postId', component:  PostComponent},
  { path: '', component:  PostListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {  }
