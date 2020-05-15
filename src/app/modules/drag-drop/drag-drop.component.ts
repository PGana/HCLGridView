import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  columns = [{ text: 'Sno', val: 'sno', index: 0 }, { text: 'Name', val: 'name', index: 1 }, { text: 'Age', val: 'age', index: 2 }];
  data = [
    { sno: 1001, name: 'ABCDF', age: 34 },
    { sno: 1002, name: 'Pthon 3', age: 102 },
    { sno: 1003, name: 'JavaScript', age: 98 }
  ];
  startIndex: number;
  endInex: number;
  constructor() { }

  ngOnInit(): void {
  }
  /*
    onDragStart(ev: any) {
      console.log('.....Drag Itm ...........');
      console.log(ev);
      const thisele = this;
      ev.target.opacity = '0.4';
      ev.dataTransfer.setData('text', ev.target.id);
    }
    onDrop(ev) {
      ev.preventDefault();
      console.log('.....Drop Item....');
      console.log(ev);
      const data = ev.dataTransfer.getData('text');
      ev.target.appendChild(document.getElementById(data));
    }
  
  
    onDragOver(ev: any) {
      ev.preventDefault();
    }
  
  
    /// Table view
  
    onDrag(ev: any) {
      ev.dataTransfer.setData('text', ev.target.id);
    }
  
    onDropTb(ev: any) {
      const curTextID = ev.dataTransfer.getData('text');
      const oldText = document.getElementById(ev.target.id).innerText;
      // ev.target.replaceWith(document.getElementById(id));
      const dragData = document.getElementById(curTextID);
      ev.target.innerText = dragData.innerText;
      dragData.replaceWith(oldText);
    }
  */

  onDragOver(ev: any) {
    ev.preventDefault();
  }

  onDrag(curIndex: number) {
    this.startIndex = curIndex;
  }

  onDropTb(oldIndex: number) {
    this.endInex = oldIndex;
    this.OnMove(this.columns, this.startIndex, this.endInex);
  }
  OnMove(arr: any[], stIndex: number, endIndex: number) {
    arr.splice(endIndex, 0, arr.splice(stIndex, 1)[0]);
    // return arr;
  }
}
