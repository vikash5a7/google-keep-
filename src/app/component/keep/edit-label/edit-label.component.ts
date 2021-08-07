import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss'],
})
export class EditLabelComponent implements OnInit {
  defaultIcon = 'edit';
  changeText = false;
  error = null;
  labelList: any;
  renameClicked = true;
  valueChanged = false;
  public label = {
    name: '',
    notes: [],
  };
  constructor(
    public _matDialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private labelService: LabelService
  ) {}
  ngOnInit() {
    this.displayAllLabels();
  }
  displayAllLabels() {
    this.labelService.getAllLabel().subscribe((label) => {
      console.log('label--', label);
      this.labelList = label;
    });
  }
  cancel(label: any) {
    console.log('lable-->', label.name);
    this._matDialogRef.close();
  }
  createLabel(label: any) {
    console.log('note name---> ' + label.name);
    this.labelService.createOrUpdateLabel(null, label).then(
      () => {
        this.snackbar.open('Label Created', 'ok', {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      },
      (err) => {
        console.log(err);
        this.snackbar.open(err, 'ok', {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
      }
    );
  }
  handleResponse(data: any) {
    console.log(data);
    this.snackbar.open('Label is created succefully', 'ok', {
      duration: 5000,
    });
  }
  handleError(error: { error: { message: any } }) {
    this.error = error.error.message;
    console.log(error);
    this.snackbar.open('this.error', 'ok', {
      duration: 5000,
    });
  }
  deleteLabel(id: any) {
    console.log('delete id.....' + id);
    this.labelService.deleteLable(id).subscribe((data) => {
      console.log(data);
      this.snackbar.open('Deleted label', 'ok', {
        duration: 5000,
      });
    });
  }
  renameLabel(label: any) {
    console.log('label id is -->' + label.id);
    console.log('rename label is ' + label.name);
    if (label.name !== null) {
      this.labelService
        .createOrUpdateLabel(label.id, label.name)
        .then((data) => {
          console.log(data);
        });
    } else {
      this.snackbar.open('can not be empty', 'ok', { duration: 4000 });
    }
  }
  done(label: any) {
    console.log('done');
    if (this.valueChanged) {
    }
    this._matDialogRef.close();
  }
  detectChange() {
    this.valueChanged = true;
  }
}
