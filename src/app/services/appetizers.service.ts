// appetizers.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { AppetizerDto } from '../models/appetizers.interface';

@Injectable({
  providedIn: 'root',
})
export class AppetizerService {
  urlApi = environment.appetizersApi;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AppetizerDto[]> {
    return this.http.get<AppetizerDto[]>(this.urlApi);
  }

  getOne(id: number): Observable<AppetizerDto> {
    return this.http.get<AppetizerDto>(`${this.urlApi}/${id}`);
  }

  add(appetizer: AppetizerDto): Observable<AppetizerDto> {
    return this.http.post<AppetizerDto>(this.urlApi, appetizer);
  }

  update(id: number, appetizer: AppetizerDto): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/${id}`, appetizer);
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
