import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  constructor(public notesService: NotesService) {}
  isNotePresent: boolean = false;
  notes: Observable<any> | undefined;
  ngOnInit() {
    this.notes = this.notesService.getUserNotes();
    this.notes.subscribe((notes) => {
      console.log('Nottes', notes);
      notes.forEach((note: any) => {
        if (note.reminder != null) {
          this.isNotePresent = true;
        }
      });
    });
  }
}
