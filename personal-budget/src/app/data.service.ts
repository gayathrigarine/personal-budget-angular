import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any[] = [];
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private isDataLoaded: boolean = false;

  constructor(private http: HttpClient) {}


  fetchDataIfNeeded(forceRefresh: boolean = false): void {
    if (!this.isDataLoaded || forceRefresh) {
      this.http.get('http://localhost:3000/data')
        .pipe(
          map((response: any) => response || []),
          catchError(error => {
            console.error('Error fetching data:', error);
            return of([]);
          })
        )
        .subscribe((response: any[]) => {
          this.data = response;
          this.isDataLoaded = true;
          this.dataSubject.next(this.data);
        });
    }
  }


  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }


  clearData(): void {
    this.data = [];
    this.isDataLoaded = false;
    this.dataSubject.next(this.data);
  }
}
