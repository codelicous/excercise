import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
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

import {tap} from 'rxjs';
import {Pokemon, PokemonData, PokemonTableRow} from './types';
import {MatDialog} from '@angular/material/dialog';
import {PokemonDialogComponent} from '../pokemon-dialog/pokemon-dialog.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';


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
    MatHeaderRowDef,
    MatPaginator,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private pokemonService = inject(PokemonService);
  private dialog = inject(MatDialog);
  private offset = signal(0);
  public readonly limit = 60

  public pokemonData: WritableSignal<PokemonData | null> = signal(null);
  public readonly displayedColumns = ['name', 'id'];
  public table = viewChild('table', {read: ElementRef});
  public data = computed(() => this.pokemonData()?.results.map(this.addIdToPokemon.bind(this)));
  public paginatorLength = computed(() => this.pokemonData() && Math.round(this.pokemonData()!.count))

  private addIdToPokemon(pokemon: Pokemon): PokemonTableRow {
    return {...pokemon, id: pokemon.url.split('/')[6]};
  }

  constructor() {
    effect((onCleanup) => {
      const subscription = this.pokemonService.getPokemons(this.offset(), this.limit).pipe(
        tap((data: PokemonData) => {
          this.pokemonData.set(data)
        })
      ).subscribe()
      onCleanup(() => subscription.unsubscribe());
    })
  }

  showPokemonData(id: string): void {
    this.pokemonService.getPokemon(id).pipe(tap(
      data => {
        this.dialog.open(PokemonDialogComponent, {width: '250px', data});
      }
    )).subscribe();
  }

  updatePage($event: PageEvent) {
    this.offset.set($event.pageIndex);
  }
}
