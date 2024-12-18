import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ImageDisplayerComponent} from './image-displayer/image-displayer.component';

@Component({
  selector: 'app-pokemon-dialog',
  imports: [
    ImageDisplayerComponent
  ],
  templateUrl: './pokemon-dialog.component.html',
  styleUrl: './pokemon-dialog.component.css'
})
export class PokemonDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    }
}
