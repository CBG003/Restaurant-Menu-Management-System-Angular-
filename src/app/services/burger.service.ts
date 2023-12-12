// burger.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { BurgerDto } from '../models/burger.interface';

@Injectable({
  providedIn: 'root',
})
export class BurgerService {
  urlApi = environment.burgerApi;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BurgerDto[]> {
    return this.http.get<BurgerDto[]>(this.urlApi);
  }

  getOne(id: number): Observable<BurgerDto> {
    return this.http.get<BurgerDto>(`${this.urlApi}/${id}`);
  }

  add(burger: BurgerDto): Observable<BurgerDto> {
    return this.http.post<BurgerDto>(this.urlApi, burger);
  }

  update(id: number, burger: BurgerDto): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/${id}`, burger);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }

  uploadImage(image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);

    
    return this.http.post<string>(`${this.urlApi}/upload-image`, formData);
  }
}
