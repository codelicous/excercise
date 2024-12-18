import {Component, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-image-displayer',
  imports: [],
  templateUrl: './image-displayer.component.html',
  styleUrl: './image-displayer.component.css'
})
export class ImageDisplayerComponent implements OnInit {
  currentImageIndex = 0
  ngOnInit(): void {
      this.displayedSprite.set(this.sprites()[0]|| '');
      setInterval(()=>{
        this.displayedSprite.set(this.sprites()[this.currentImageIndex]);
        if(this.currentImageIndex === this.sprites().length-1){
          this.currentImageIndex = 0;
        } else {
          this.currentImageIndex++;
        }
      }, 1000);
  }

  sprites: InputSignal<string[]> = input([''], { transform: (value)=> Object.values(value).filter(val=> val && typeof val === 'string')});
  displayedSprite: WritableSignal<string> = signal('')

}
