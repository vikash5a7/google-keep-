import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/services/notes.service';
import { LabelService } from 'src/app/services/label.service';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note: any;
  show = false;
  changeText;
  removableLabel: boolean = true;
  removable: boolean = true;
  isList: boolean = false;
  labelList: any = [];
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private noteService: NotesService,
    private labelService: LabelService
  ) {
    this.changeText = false;
  }
  ngOnInit() {
    this.noteService.isList.subscribe((data: any) => {
      this.isList = data;
    });

    if (this.note.label.length > 0) {
      this.note.label.forEach((id: any) => {
        this.labelService.getLabelById(id).subscribe((label: any) => {
          this.labelList.push(label);
        });
      });
    }
    console.log('this is', this.labelList);
    console.log('note', this.note.id);
  }
  pinned(id: any) {
    console.log('id', id);

    let isPinned = !this.note.isPin;
    console.log('isPined', isPinned);
    this.noteService.updatePin(id, isPinned);
  }
  openDialog(note: any) {
    console.log('catched note at simple note ', note);
    const matDialogueReference = this.dialog.open(UpdateNoteComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { note },
    });
    matDialogueReference.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with out update');
    });
  }
  showIcons() {
    this.show = true;
    console.log('in');
  }
  outIcons() {
    this.show = false;
    console.log('out');
  }
  stopEvent(e: MouseEvent) {
    e.stopPropagation();
  }
  removeReminder(id: any) {
    console.log(id);
    this.removable = false;
    this.noteService.removeReminder(id).subscribe((data) => {
      this.snackBar.open('removed reminder', 'ok', {
        duration: 3000,
      });
    });
  }
  removePic(id: string) {
    this.noteService.removeImage(id).subscribe((data) => {
      this.snackBar.open('removed Image', 'ok', {
        duration: 3000,
      });
    });
  }
  removeLabel(noteid: string, labelId: any) {
    console.log(noteid, labelId);

    this.labelService
      .removeLabel(labelId, noteid)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
