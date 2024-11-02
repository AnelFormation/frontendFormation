import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:5042/api/Persons';

  constructor(private http: HttpClient) {}

  getPersons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPerson(person: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, person);
  }

  updatePerson(person: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${person.id}`, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
