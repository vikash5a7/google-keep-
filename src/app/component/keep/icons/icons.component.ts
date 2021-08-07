import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelService } from 'src/app/services/label.service';
import { NotesService } from 'src/app/services/notes.service';
import { CollabratorComponentComponent } from '../collabrator-component/collabrator-component.component';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent implements OnInit {
  show: boolean = false;
  todayTime: any;
  tomorrow: any;
  date: any;
  SearchTeram: any;
  myDatePicker: any;
  removable: boolean = true;
  showUndo: boolean = false;
  isList: any;
  constructor(
    private noteService: NotesService,
    private snackBar: MatSnackBar,
    private labelService: LabelService,
    public dialog: MatDialog
  ) {}
  @Input() note1: any;
  public dateTime = null;
  public checked = false;
  public removableLabel = true;
  label: any;
  labelList: any;
  public note = {
    reminder: '',
  };
  arrayOfColors = [
    [
      { color: 'rgb(255, 179, 255)', name: 'pink' },
      { color: 'rgb(255, 255, 128)', name: 'darkGolden' },
      { color: 'white', name: 'white' },
    ],
    [
      { color: 'slategray', name: 'grey' },
      { color: 'rgb(153, 221, 255)', name: 'light blue' },
      { color: 'rgb(200, 232, 104)', name: 'yellow' },
    ],
    [
      { color: 'rgb(255, 153, 0)', name: 'orange' },
      { color: 'rgb(97, 191, 82)', name: 'green' },
      { color: ' rgb(158, 136, 191)', name: 'darkYellow' },
    ],
  ];
  ngOnInit() {
    this.displayAllLabels();
    let date = new Date();
    this.todayTime = date.setHours(date.getHours() + 1);
    this.tomorrow = date.setDate(date.getDate() + 1);
    this.noteService.isList.subscribe((data: any) => {
      this.isList = data;
    });
  }

  Tomorrow() {
    this.removable = true;
    this.date = this.todayTime;
  }
  today() {
    this.removable = true;
    this.date = this.tomorrow;
  }
  setColor(id: any, color: any) {
    console.log('setColor', color);
    this.noteService.updateColor(id, color);
  }
  deleteNote(id: any) {
    this.noteService.deleteNotes(id, !this.note1.isTrash);
  }
  archive(id: any) {
    let archive = !this.note1.archive;
    this.noteService.updateArchive(id, archive);
  }
  removeReminder(id: any) {
    this.removable = false;
    this.date = null;
  }
  makeCopy(note: any) {}
  stopPropagation(event: any) {
    event.stopPropagation();
  }
  addNoteToLabel(labelId: any, noteId: any) {
    console.log(labelId);
    this.labelService.addNotesToLabel(labelId.id, noteId).then((data) => {
      console.log(data);
    });
  }
  displayAllLabels() {
    this.labelService.getAllLabel().subscribe((label) => {
      console.log('label--', label);
      this.labelList = label;
    });
  }

  removeLabel(label: any) {}

  openDialog(note: any) {
    console.log('catched note at simple note ', note);
    const matDialogueReference = this.dialog.open(
      CollabratorComponentComponent,
      {
        width: '500px',
        height: 'auto',
        panelClass: 'custom-dialog-container',
        data: { note },
      }
    );
    matDialogueReference.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with out update');
    });
  }
  stopEvent(e: MouseEvent) {
    e.stopPropagation();
  }
  copyNote(note: any) {
    note.id = null;
    this.noteService.createOrUpdateNote(null, note).then(
      () => {
        this.snackBar.open('Copied..', 'ok', {
          duration: 3000,
        });
      },
      (err) => {
        console.log(err);
        this.snackBar.open(err, 'ok', {
          duration: 3000,
        });
      }
    );
  }
  addReminder(id: any) {
    console.log('id for reminder note', id);
    console.log('id for reminder note', this.note.reminder);
    this.noteService.addReminder(id, this.note.reminder);
  }
}
