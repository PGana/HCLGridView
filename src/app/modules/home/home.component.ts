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

  /// Drag-drop variables
  startIndex: number;
  endIndex: number;
  columns = [
    { text: 'Cource ID', val: 'id' },
    { text: 'Cource Name', val: 'name' },
    { text: 'Duration(Hrs)', val: 'duration' },
    { text: 'Cost', val: 'cost' },
    { text: 'Tutor', val: 'tutor' },
    { text: 'Start Date', val: 'startDate' }
  ];
  /// ..End Drag and drop variable declaraion

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

  /**----------------------------
   * Table Column - Drag and Drop Implementation
   */
  onDrag(curIndex: number) {
    this.startIndex = curIndex;
    console.log('....drag called.....');
    
  }
  onDragOver(ev: any) {
    ev.preventDefault();
  }
  onDrop(oldIndex: number) {
    this.endIndex = oldIndex;
    this.onMoveIndex(this.columns, this.startIndex, this.endIndex);
  }

  /**
   * This method helps to re-order the array's list
   * @param arr Array list
   * @param sIndex Start Index/From Index
   * @param eIndex End Index / TO Index
   * Ex : arr = [a,b,c,d], OnMoveIndex(arr, 1,3) // output : [a,d,b,c]
   */
  onMoveIndex(arr: any[], sIndex: number, eIndex: number) {
    arr.splice(eIndex, 0, arr.splice(sIndex, 1)[0]);
  }
  /// ..End Drag-drop methods
}
