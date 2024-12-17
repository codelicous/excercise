import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-pokemon-dialog',
  imports: [
    JsonPipe
  ],
  templateUrl: './pokemon-dialog.component.html',
  styleUrl: './pokemon-dialog.component.css'
})
export class PokemonDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    }
}
