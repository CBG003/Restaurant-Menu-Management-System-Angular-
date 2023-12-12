// burger.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { DishDto } from '../models/dishes.interface';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  urlApi = environment.DishApi;

  constructor(private http: HttpClient) {}

  getAll(): Observable<DishDto[]> {
    return this.http.get<DishDto[]>(this.urlApi);
  }

  getOne(id: number): Observable<DishDto> {
    return this.http.get<DishDto>(`${this.urlApi}/${id}`);
  }

  add(burger: DishDto): Observable<DishDto> {
    return this.http.post<DishDto>(this.urlApi, burger);
  }

  update(id: number, burger: DishDto): Observable<void> {
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
