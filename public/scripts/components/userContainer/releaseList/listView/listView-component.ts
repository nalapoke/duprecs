import { Component, Input } from 'angular2/core';

import { ReleaseFilterPipe } from '../../../../pipes/releaseFilter-pipe';
import { TruncateFilterPipe } from '../../../../pipes/truncateFilter-pipe';
import { IRelease } from '../../../../models/release';

@Component({
  selector: 'dr-list-view',
  templateUrl: 'scripts/components/userContainer/releaseList/listView/listView.html',
  pipes: [ReleaseFilterPipe, TruncateFilterPipe]
})
export class ListViewComponent {
  @Input() releaseCollection: IRelease[];
  @Input() filterText: string;
}
