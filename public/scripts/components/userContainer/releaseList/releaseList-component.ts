import { Component, Input, OnChanges } from 'angular2/core';

import { GridViewComponent } from './gridView/gridView-component';
import { ListViewComponent } from './listView/listView-component';
import { IReleaseCollection } from '../../../models/releaseCollection';
import { ReleaseListViewType } from '../../../models/releaseListViewType';
import { ReleaseCollectionType } from '../../../models/releaseCollectionType';

@Component ({
  selector: 'dr-release-list',
  templateUrl: 'scripts/components/userContainer/releaseList/releaseList.html',
  directives: [GridViewComponent, ListViewComponent]
})
export class ReleaseListComponent implements OnChanges {
  @Input() releaseCollection: IReleaseCollection;
  currentReleaseListViewType: ReleaseListViewType;
  releaseListViewTypes = ReleaseListViewType;
  releaseCollectionTypes = ReleaseCollectionType;
  filterText: string;

  constructor() {
    this.currentReleaseListViewType = ReleaseListViewType.grid;
  }

  ngOnChanges(): void {
    this.filterText = '';
  }

  onReleaseListViewTypeClick(viewTypeSelected: ReleaseListViewType): void {
    if (this.currentReleaseListViewType !== viewTypeSelected) {
      this.currentReleaseListViewType = viewTypeSelected;
    }
  }
}
