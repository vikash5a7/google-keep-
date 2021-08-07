import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
})
export class TrashComponent implements OnInit {
  isEmptyTrashedNotesList = true;
  notes: any;
  isTrash = false;
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesService.getAllTrashedNotes().subscribe((data) => {
      this.notes = data;
      if (this.notes.length > 0) {
        this.isEmptyTrashedNotesList = false;
      }
    });
  }
  deletePermanetly(id: string) {
    this.notesService.deleteNotesPermanently(id).subscribe((data) => {
      console.log(data);
    });
  }
  restoreNote(id: string) {
    this.notesService.deleteNotes(id, false);
    console.log('delet', id);
  }
}
