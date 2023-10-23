import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() handleClearAll = new EventEmitter<boolean>()
  @Output() handleSetToDefault = new EventEmitter<boolean>()


  clearAll(){
    this.handleClearAll.emit(true)
  }
  setToDefault(){
    localStorage.removeItem('comments')
    this.handleSetToDefault.emit(true)
  }
}
