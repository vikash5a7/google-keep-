import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HostListener, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LabelService } from 'src/app/services/label.service';
import { NotesService } from 'src/app/services/notes.service';
import { EditLabelComponent } from '../../keep/edit-label/edit-label.component';
import { UploadProfileComponent } from '../../keep/upload-profile/upload-profile.component';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(300)]),
      transition(':leave', [animate(500)]),
    ]),
  ],
})
export class LayoutComponent implements OnInit {
  menuvalue: string = 'Keep';
  grid: boolean = true;
  user: any;
  labels: any;
  SearchTeram: any;
  searcClick: boolean = false;
  private sidenav: MatSidenav;
  constructor(
    sidenav: MatSidenav,
    private authService: AuthService,
    public dialog: MatDialog,
    private labelService: LabelService,
    private notesService: NotesService,
    private route: Router
  ) {
    this.sidenav = sidenav;
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (window.pageYOffset > 10) {
      let element = document.getElementById('navbar');
      if (element != null) {
        element.classList.add('sticky');
      }
    } else {
      let element = document.getElementById('navbar');
      if (element != null) {
        element.classList.remove('sticky');
      }
    }
  }
  ngOnInit(): void {
    this.authService.getsingleUserId().subscribe((user) => {
      console.log('user--', user);
      this.user = user;
    });

    this.labelService.getAllLabel().subscribe((label) => {
      console.log('label--', label);
      this.labels = label;
    });
    this.subjectKeyUp
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((d) => {
        this.getBooks(d);
      });
  }

  refresh() {
    window.location.reload();
  }
  name: any;
  logout() {
    this.authService.signOut();
  }
  selectFile(event: any) {}
  onClickView() {
    this.grid = !this.grid;
    this.notesService.isList.next(this.grid);
  }
  searchClick() {
    this.searcClick = true;
    this.notesService.clicked.next(true);
  }
  toggleSidenav() {
    console.log('cliked');
    console.log(this.sidenav.toggle());
    this.sidenav.toggle();
  }
  openDialog(userId: string) {
    console.log('catched note at simple note ', userId);
    const matDialogueReference = this.dialog.open(UploadProfileComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { userId },
    });
    matDialogueReference.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with out update');
    });
  }
  openEditLabelDialog() {
    console.log('catched note at simple note ');
    const matDialogueReference = this.dialog.open(EditLabelComponent, {
      width: '330px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
    matDialogueReference.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with out update');
    });
  }
  private subjectKeyUp = new Subject<any>();
  books$: any;

  search(searchValue: any) {
    const value = searchValue.target.value;
    this.subjectKeyUp.next(value);
  }
  closeBtn() {
    this.searcClick = false;
    this.SearchTeram = '';
    this.notesService.clicked.next(false);
  }
  getBooks(value: string) {
    this.notesService.getNoteFiltered(value).subscribe((result) => {
      let results = result;
      this.notesService.searchNotes.next(results);
    });
  }
  navigateToLabel(id: any) {
    this.route.navigate(['/dashboard/label/', id]);
  }
}
