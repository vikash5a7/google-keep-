import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUpload } from 'src/app/Model/file-upload.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.scss'],
})
export class UploadProfileComponent implements OnInit {
  selectedFiles: any;
  displayfiles: boolean = false;
  userId: string | undefined;
  profileUrl: any;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUpload!: FileUpload;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public _matDialogRef: MatDialogRef<UploadProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('id----', data);
    this.userId = data.userId;
  }

  ngOnInit(): void {}
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

        this.authService.uploadPic(this.currentFileUpload).subscribe(
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
    this.authService.currentURL.subscribe((url) => {
      console.log('Url', url);
      if (url != null && url != undefined) {
        this.displayfiles = true;
        this.profileUrl = url;
        console.log('Url from', url);
      }
    });
  }
  close() {
    this._matDialogRef.close();
  }
  updateProfile() {
    if (this.profileUrl != null && this.userId != null) {
      this.authService.updateProfile(this.userId, this.profileUrl);
      this.snackBar.open('Profile updated', 'ok', {
        duration: 2000,
      });
      this._matDialogRef.close();
    }
  }
}
