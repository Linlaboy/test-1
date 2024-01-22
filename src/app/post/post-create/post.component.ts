import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: `./post.component.html`,
  styleUrl: './post.component.css'
})
export class PostComponent {
  entryTitle = '';
  entryContent = '';
  @Output() postCreated = new EventEmitter();
  onAddPost() {
    const post = {
      title: this.entryTitle,
      content: this.entryContent
    };
    this.postCreated.emit(post);
  }

}
