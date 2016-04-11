import { Component, Input } from 'angular2/core';

import { ReleaseFilterPipe } from '../../../pipes/releaseFilter-pipe';
import { TruncateFilterPipe } from '../../../pipes/truncateFilter-pipe';
import { IRelease } from '../../../models/release';

@Component({
  selector: 'dr-grid-view',
  templateUrl: 'scripts/components/userCollection/gridView/gridView.html',
  pipes: [ReleaseFilterPipe, TruncateFilterPipe]
})
export class GridViewComponent {
  @Input() userCollection: IRelease[];
  maxTitleAndArtistLength: number = 18;
}
