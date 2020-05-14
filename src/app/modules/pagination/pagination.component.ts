import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() inputDataSource: any[];
  @Output() stepEmit = new EventEmitter();
  stepStartIndex = 1;
  pageSize = 2;
  dataSource: any[];
  curPageNo = 1;
  totalPages: number;
  isStepcalled = false;
  constructor() { }

  ngOnInit(): void {
    // Default Step
    setTimeout(() => {
      this.onStep('first');
    });

  }

  /**
   * Page Navigation b/w the pages
   * @param step Step size (first, next, prev, last)
   */
  onStep(step: string) {
    if (this.isStepcalled === false) {
      this.dataSource = this.inputDataSource.slice();
    }
    const len = this.dataSource.length;
    const totPages = Math.floor(len / this.pageSize);
    this.totalPages = totPages <= 1 ? 1 : totPages + 1;
    switch (step) {
      case 'next':
        this.stepStartIndex += this.pageSize;
        break;
      case 'prev':
        this.stepStartIndex -= this.pageSize;
        break;
      case 'first':
        this.stepStartIndex = 1;
        break;
      case 'last':
        /// Removes the fraction values
        const startIndex = Math.floor(len / this.pageSize);
        this.stepStartIndex = (startIndex * this.pageSize) + 1;
        break;
    }
    this.curPageNo = Math.floor(this.stepStartIndex / this.pageSize) + 1;
    const temp = this.dataSource.slice(this.stepStartIndex - 1, (this.stepStartIndex + this.pageSize) - 1);
    this.isStepcalled = true;
    this.stepEmit.emit(temp);
  }

  /**
   * Selection List - On Change - Change page size : (Note : When this event triggers default page will be first page)
   * @param size Page Size selected in dropdown list
   */
  onChangePageSize(size: number) {
    this.pageSize = +size;
    // this.isStepcalled = false;
    this.onStep('first');
  }
}
