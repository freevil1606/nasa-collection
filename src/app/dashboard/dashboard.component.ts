import { Component, OnInit } from '@angular/core';
import {NasaItem} from "../nasa-item";
import {NASA_COLLECTION} from "../mock-nasa-collection";
import {NasaService} from "../nasa.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nasaCollection: NasaItem[] = [];

  reviewingNasaItem?: NasaItem;
  editingNasaItem?: NasaItem;

  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    this.nasaCollection = this.nasaService.getNasaCollection();
  }

  openReviewModal(nasaItem: NasaItem) {
    this.reviewingNasaItem = nasaItem;
  }

  closeReviewModal() {
    this.reviewingNasaItem = undefined;
  }

  openEditModal(nasaItem: NasaItem) {
    this.editingNasaItem = Object.assign({}, nasaItem);
  }

  saveNasaItem(nasaItem: NasaItem) {
    let index = this.nasaCollection.findIndex(nasaMedia => nasaMedia.id === nasaItem.id);
    this.nasaCollection[index] = nasaItem;

    this.closeEditModal();
  }

  closeEditModal() {
    this.editingNasaItem = undefined;
  }
}
