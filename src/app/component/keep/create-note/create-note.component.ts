import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/Model/file-upload.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotesService } from 'src/app/services/notes.service';
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
  selectedFiles: any;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUpload!: FileUpload;
  todayTime: any;
  tomorrow: any;
  date: any;
  myDatePicker: any;
  removable: boolean = true;
  private dataUndoArray: Array<any> = [];
  private dataRedoArray: Array<any> = [];
  private storeInputValue: Array<any> = [];
  undoLimit: number = 5000;
  showUndo: boolean = false;
  showRedo: boolean = false;
  open = false;
  cardColor = 'white';
  error = null;
  id = null;
  dummyNotes: any;
  imageShow: boolean = false;
  public note = {
    index: '',
    title: '',
    description: '',
    isPin: false,
    color: '',
    reminder: null,
    image: null,
    archive: false,
    label: [],
    isTrash: false,
    updated_at: '',
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

  constructor(
    private matSnackBar: MatSnackBar,
    public uploadService: NotesService
  ) {}

  ngOnInit() {
    let date = new Date();
    this.todayTime = date.setHours(date.getHours() + 1);
    this.tomorrow = date.setDate(date.getDate() + 1);
    this.dummyNotes = this.note;
  }
  onClickCreateNoteOpen() {
    this.open = true;
  }

  onSubmit() {
    this.open = false;
    this.cardColor = 'white';
    console.log('log from ', this.note);
    if (this.note.description !== '' && this.note.description !== null) {
      this.note.index = '' + new Date().getTime();
      console.log('time', this.note.index);
      this.uploadService.createOrUpdateNote(this.id, this.note).then(
        () => {
          this.matSnackBar.open('Notes Created', 'ok', {
            duration: 3000,
          });
          this.uploadService.currentURL.next(null);
          this.uploadService.currentFileUploadedUrl.next(null);
          this.note.image = null;
          this.imageShow = false;
        },
        (err) => {
          console.log(err);
          this.matSnackBar.open(err, 'ok', {
            duration: 3000,
          });
        }
      );
    }
  }
  handleResponse(data: any) {
    console.log(data);
    this.matSnackBar.open('Note is created succefully', 'ok', {
      duration: 5000,
    });
  }
  handleError(error: any) {
    this.error = error.error.message;
    console.log(error);
    this.matSnackBar.open(error, 'ok', {
      duration: 5000,
    });
  }
  getColor(color: string) {
    console.log(color);
    this.cardColor = color;
    this.note.color = color;
  }
  undo(): void {
    console.log('called');
    this.showRedo = true;
    if (this.dataUndoArray.length != 0) {
      this.dataRedoArray.push(this.storeInputValue.pop());
      this.storeInputValue.push(this.dataUndoArray.pop());
      this.dataRedoArray.forEach((element) => {
        this.note.description = element;
      });
      if (this.dataUndoArray.length == 0) {
        this.showUndo = false;
      }
    }
  }

  redo(): void {
    if (this.dataRedoArray.length != 0) {
      this.dataUndoArray.push(this.storeInputValue.pop());
      this.storeInputValue.push(this.dataRedoArray.pop());

      if (this.dataRedoArray.length == 0) {
        this.showRedo = false;
      }
    }
    this.dataRedoArray.forEach((element) => {
      this.note.description = element;
    });
    if (this.dataUndoArray.length != 0) {
      this.showUndo = true;
    } else {
      this.showUndo = false;
    }
  }
  detectChangeTitle(title: any) {
    console.log(title);
    if (title != '') {
      this.dataRedoArray = [];
      this.showRedo = false;
      if (this.storeInputValue.length === 0) {
        this.storeInputValue.push(title.value);
      } else {
        if (this.dataUndoArray.length == this.undoLimit) {
          this.dataUndoArray.reverse().pop();
          this.dataUndoArray.reverse();
        }
        this.dataUndoArray.push(this.storeInputValue.pop());
        this.storeInputValue.push(title);
        this.showUndo = true;
      }
    }
  }
  detectTime(time: any) {
    this.date = time;
    console.log(this.date);
  }
  detectTime1() {
    this.note.reminder = this.date;
    console.log(this.date);
  }
  removeReminder() {
    this.removable = false;
    this.date = null;
  }
  Tomorrow() {
    this.removable = true;
    console.log('tomorrow button clicked');
    this.date = this.todayTime;
    this.note.reminder = this.date;
  }
  today() {
    this.removable = true;
    console.log('today button clicked');
    this.date = this.tomorrow;
    this.note.reminder = this.date;
    console.log('time', this.todayTime);
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
            console.log(percentage);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
    this.uploadService.currentURL.subscribe((url) => {
      console.log('Url', url);
      if (url != null && url != undefined) {
        this.note.image = url;
        this.imageShow = true;
      }
    });
  }
  image() {}
}
