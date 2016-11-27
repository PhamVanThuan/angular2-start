import {
  Component, Input,
  Output, EventEmitter
} from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: [ './todo.component.scss' ]
})
export class TodoComponent {
  @Input() public item: Todo;
  @Input() public id: number;
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();

  edit(): void {
    this.onEdit.emit({ id: this.id, todo: this.item });
  }

  delete(): void {
    this.onDelete.emit(this.id);
  }
}
