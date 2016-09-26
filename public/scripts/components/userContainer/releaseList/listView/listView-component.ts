import { Component, Input } from '@angular/core';
import { IRelease } from '../../../../models/release';

@Component({
  selector: 'dr-list-view',
  templateUrl: 'scripts/components/userContainer/releaseList/listView/listView.html'
})
export class ListViewComponent {
  @Input() releaseCollection: IRelease[];
  @Input() filterText: string;
}
