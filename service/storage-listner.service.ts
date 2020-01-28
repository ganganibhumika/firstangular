import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageListnerService {
  private onSubject = new Subject<{ key: string; value: any }>();
  public changes = this.onSubject.asObservable();
  key = 'userDetails';

  constructor(public router: Router) {
    this.start();
  }
  ngOnDestroy() {
    this.stop();
  }

  public store(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    if (data.isAdmin == true) {
      this.router.navigate(['/home/work_area/admin/dashboard']);
    } else {
      console.log('redirect to user dashboard');
      this.router.navigate(['/home/work_area/user/dashboard']);
    }
    this.onSubject.next({ key: key, value: data });
  }


  public clear() {
    console.log('logout');
    const key = 'userDetails';
    localStorage.removeItem('userDetails');
    this.router.navigate(['/home/work_area/landing']);
    this.onSubject.next({ key: key, value: null });
  }

  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (!event.newValue) {
      this.router.navigate(['/home/work_area/landing']);
    } else {
      this.router.navigate(['/home/work_area/user/dashboard']);
    }
  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }


  unSetRemember() {
    localStorage.removeItem('user');
    localStorage.removeItem('pass');
  }
}
