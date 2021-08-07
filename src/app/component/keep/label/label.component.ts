import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelService } from 'src/app/services/label.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  notes: any = [];

  id: any;
  isNotePresent: boolean = false;
  listOfNotes: any;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private labelService: LabelService,
    private noteService: NotesService
  ) {
    // this is for the forcing reloading the component if something change in paramenter
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    console.log('id:============= ' + this.id);
    this.labelService.getLabelById(this.id).subscribe((data) => {
      console.log('data', data);
      this.listOfNotes = data.notes;
      if (this.listOfNotes.length > 0) {
        this.isNotePresent = true;
        this.listOfNotes.forEach((id: any) => {
          this.noteService.getNotelById(id).subscribe((note) => {
            this.notes.push(note);
          });
        });
      }
    });
  }
}
