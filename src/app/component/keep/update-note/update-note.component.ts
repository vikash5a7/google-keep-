import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
  note: any;
  open = false;
  error = null;
  valueChanged = false;
  constructor(
    public _matDialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private snackbar: MatSnackBar,
    private notesService: NotesService
  ) {
    this.note = this.data.note;
  }

  ngOnInit() {}
  onSubmit() {
    this._matDialogRef.close();
    if (this.valueChanged == true) {
      console.log(this.note);
      this.notesService
        .createOrUpdateNote(this.note.id, this.note)
        .then((data: any) => {
          this.handleResponse(data);
        })
        .catch((err) => {
          this.handleError(err);
        });
    }
  }
  handleResponse(data: any) {
    console.log(data);
    this.snackbar.open('Note is updated succefully', 'ok', {
      duration: 5000,
    });
  }
  handleError(error: { error: { message: any } }) {
    this.error = error.error.message;
    console.log(error);
  }
  close() {
    console.log('dialogue closed');
    this._matDialogRef.close();
  }
  detectChange(note: any) {
    this.valueChanged = true;
    console.log('Value chanhed--->' + this.valueChanged);
  }
}
