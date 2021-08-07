import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  ngOnInit(): void {}
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    console.log('Event ', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,

        event.previousIndex,
        event.currentIndex
      );
      console.log('event data', event.container.data);
      console.log(' event.currentIndex,', event.currentIndex);
      console.log(' event.previousIndex,', event.previousIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(
        ' event.previousContainer.data,',
        event.previousContainer.data
      );
      console.log('event.container.data,', event.container.data);
      console.log('event.previousIndex,', event.previousIndex);
      console.log('   event.currentIndex', event.currentIndex);
    }
  }
}
