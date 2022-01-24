import { Component, OnInit } from '@angular/core';
import {NasaItem} from "../nasa-item";
import {NasaService} from "../nasa.service";
import {debounce, debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  nasaSearchCollection$!: Observable<NasaItem[]>;
  reviewingNasaItem?: NasaItem;
  addingNasaItem?: NasaItem;

  private searchTerm = new Subject<string>();

  constructor(private nasaService: NasaService) {
  }

  ngOnInit(): void {
    this.nasaSearchCollection$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.nasaService.searchBy(term))
    );
  }

  search(term: string):void {
    this.searchTerm.next(term);
  }

  openReviewModal(nasaItem: NasaItem) {
    this.reviewingNasaItem = nasaItem;
  }

  closeReviewModal() {
    this.reviewingNasaItem = undefined;
  }

  openAddModal(nasaItem: NasaItem) {
    this.addingNasaItem = Object.assign({}, nasaItem);
  }

  addNasaItemToCollection(nasaItem: NasaItem) {
    this.nasaService.addNewItemToCollection(nasaItem);
    this.closeAddModal();
  }

  closeAddModal() {
    this.addingNasaItem = undefined;
  }
}
