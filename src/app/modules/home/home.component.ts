import { Component, OnInit } from '@angular/core';
import { CourcesService } from 'src/app/core/services/cources.service';
import { ClassCources } from 'src/app/core/classes/class.cources';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cources: ClassCources[];
  backupCources: ClassCources[];
  isAssendingOrder = true;
  activeSortColumn = 'id';
  constructor(private $cource: CourcesService) { }

  ngOnInit(): void {
    this.funLoadCources();
  }

  /**
   * Cource - Initial Load
   */
  funLoadCources() {
    this.$cource.getCources().subscribe((res: any[]) => {
      this.backupCources = res.map(ele => new ClassCources(ele));
      this.activeSortColumn = 'id';
    }, error => console.log(error)
    );
  }

  /**
   * SORT the list assending or decending order
   * @param column Cource object key name.
   */
  onSort(column: string, isAscOrder: boolean) {
    this.activeSortColumn = column;
    console.log('Column :' + column, this.isAssendingOrder);
    const bool = isAscOrder;
    this.cources.sort(function (a, b) {
      if (a[column] > b[column]) {
        return bool === true ? 1 : -1;
      } else {
        return bool === true ? -1 : 1;
      }
    });
    this.isAssendingOrder = bool;
  }

  /**
   * Pagination Emiter - It get trigger when page changes.
   * @param ev Object list comes from pagination compoent
   */
  onPagiEmit(ev) {
    this.cources = [...ev];
    /// Do default sort - Cource ID
    this.onSort(this.activeSortColumn, this.isAssendingOrder);
  }
}
