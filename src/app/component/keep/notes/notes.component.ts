import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    public notesService: NotesService,
    private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {}
  isNotePresent: boolean = false;
  UnPinedNotes: any = [];
  pinedNotes: any = [];
  searchBtnClicked: boolean = false;
  searchNotes: any = [];
  found: any;
  isList: boolean = false;
  ngOnInit() {
    this.spinner.show();
    this.notesService.isList.subscribe((data) => {
      this.isList = data;
      console.log('this is list', this.isList);
    });
    this.notesService.searchNotes.subscribe((data) => {
      console.log('search notes from notes component', data);
      this.searchNotes = data;
    });
    this.notesService
      .getUserUnpinedNotes()
      .subscribe((notes: string | any[]) => {
        console.log('Nottes', notes);
        if (notes.length > 0) {
          this.isNotePresent = true;
          this.UnPinedNotes = notes;
        }
      });
    this.notesService.getUserPinedNotes().subscribe((notes: string | any[]) => {
      this.spinner.hide();
      console.log('Nottes', notes);
      if (notes.length > 0) {
        this.pinedNotes = notes;
        this.isNotePresent = true;
      }
    });
    this.notesService.clicked.subscribe((clicked) => {
      this.spinner.hide();
      console.log('clicked from notes', clicked);
      this.searchBtnClicked = clicked;
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

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
