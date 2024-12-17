import {Component, computed, effect, ElementRef, inject, Renderer2, signal, viewChild} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {PokemonService} from '../pokemon.service';
import {CommonModule} from '@angular/common';

import {debounceTime, fromEvent, map, tap} from 'rxjs';
import {Pokemon, PokemonTableRow} from './types';
import {MatDialog} from '@angular/material/dialog';
import {PokemonDialogComponent} from '../pokemon-dialog/pokemon-dialog.component';
import {CdkFixedSizeVirtualScroll} from '@angular/cdk/scrolling';



@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule,
    MatTable,
    CommonModule,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef, CdkFixedSizeVirtualScroll,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private pokemonService = inject(PokemonService);
  private dialog = inject(MatDialog);
  public readonly displayedColumns = ['name', 'id'];
  public table = viewChild('table', {read: ElementRef});
  public data = computed(() =>
    this.pokemonService.getPokemons(this.offset(), this.limit).pipe(
      map(data => data!.results.map(this.addIdToPokemon.bind(this)))
    )
  );
  private offset = signal(0);
  private limit = 60
  private numberOfPagesInBuffer: number = 3;
  private firstPage: number = 1;

  private totalNumberOfPages: number = 10;
  private renderer = inject(Renderer2);
  tableScrollEvent = effect(() => {
      const subscription = fromEvent(this.table()?.nativeElement, 'scroll').pipe(debounceTime(700)).subscribe(e => this.onTableScroll(e));
    }
  );

  private lastPage = computed(() => Math.min(this.totalNumberOfPages, this.firstPage + this.numberOfPagesInBuffer - 1))

  private addIdToPokemon(pokemon: Pokemon): PokemonTableRow {
    return {...pokemon, id: pokemon.url.split('/')[6]};
  }

  showPokemonData(id: string): void {
    this.pokemonService.getPokemon(id).pipe(tap(
      data => {
        this.dialog.open(PokemonDialogComponent, {width: '250px', data});
      }
    )).subscribe();
  }

  private onTableScroll(e: any): void {
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const scrollThreshold = 80;
    const scrollDownLimit = tableScrollHeight - tableViewHeight - scrollThreshold;
    if (scrollLocation > scrollDownLimit && this.lastPage() < this.totalNumberOfPages) {
      this.offset.update(val => val += 20);
      this.scrollTo(tableScrollHeight/2 + tableViewHeight);

    }
  }

  private scrollTo(position: number): void {
    this.renderer.setProperty(this.table()!.nativeElement, 'scrollTop', position);
  }
}
