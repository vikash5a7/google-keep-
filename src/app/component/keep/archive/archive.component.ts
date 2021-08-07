import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  constructor(public notesService: NotesService) {}
  isNotePresent: boolean = false;
  notes: Observable<any> | undefined;
  ngOnInit() {
    this.notes = this.notesService.getAllArchivedNotes();
    this.notes.subscribe((notes) => {
      console.log('Nottes', notes);
      notes.forEach((note: any) => {
        if (note.archive == true) {
          this.isNotePresent = true;
        }
      });
    });
  }
}
