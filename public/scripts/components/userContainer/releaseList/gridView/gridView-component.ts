import { Component, Input } from '@angular/core';
import { IRelease } from '../../../../models/release';

@Component({
  selector: 'dr-grid-view',
  templateUrl: 'scripts/components/userContainer/releaseList/gridView/gridView.html',
})
export class GridViewComponent {
  @Input() releaseCollection: IRelease[];
  @Input() filterText: string;
  maxTitleAndArtistLength: number = 18;
}
