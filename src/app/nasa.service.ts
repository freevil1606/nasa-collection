import {Injectable} from '@angular/core';
import {NasaItem} from "./nasa-item";
import {NASA_COLLECTION} from "./mock-nasa-collection";
import {Observable, of} from "rxjs";
import {NASA_SEARCH_COLLECTION} from "./mock-search-nasa-collection";

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  constructor() { }

  getNasaCollection(): NasaItem[] {
    return NASA_COLLECTION;
  }

  searchBy(keyword: string): Observable<NasaItem[]> {
    if(!keyword.trim()) return of([]);

    return of(NASA_SEARCH_COLLECTION.filter(nasaItem => {
      return nasaItem.description.includes(keyword) || nasaItem.title.includes(keyword);
    }))
  }

  addNewItemToCollection(nasaItem: NasaItem): void {
    nasaItem.id = NASA_COLLECTION.length + 1;
    NASA_COLLECTION.push(nasaItem);
  }
}
