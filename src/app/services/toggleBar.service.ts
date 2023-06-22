import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleBarService {
  showBar = true;
  public trackShow = new BehaviorSubject<boolean>(true);
constructor() { }

  showNav() {
    this.showBar = !this.showBar;
    this.trackShow.next(this.showBar);
  }
}
