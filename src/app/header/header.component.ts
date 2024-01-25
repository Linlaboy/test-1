import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from '../post/post-list/post-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    PostListComponent],
  templateUrl: `./header.component.html`,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
