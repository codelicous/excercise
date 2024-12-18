import {Component, HostBinding, Inject} from '@angular/core';
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
  @HostBinding('class') dialogClass = 'default';
  getMainType(): string {
    return  this.data?.types[0]?.type?.name;
  }
    setDialogClass(){
      switch (this.data.types[0]){
        case 'water':
          this.dialogClass = 'blue';
      }
    }
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.getMainType());
      switch (this.getMainType()) {
        case 'grass':
          this.dialogClass = 'green';
          break;
        case 'fire':
          this.dialogClass = 'fire';
          break;
        case 'water':
          this.dialogClass = 'blue';
          break;
      }
    }
}
