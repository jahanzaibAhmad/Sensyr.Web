import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class BaseService<T> {


  constructor(
    private httpClient: HttpClient,
    private url: string) {

  }

  public post(item: T, endpoint: string = ''): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${endpoint}`, item)
      .pipe(map((data: any) => data));
  }

  public put(item: T, id: any, endpoint: string = ''): Observable<T> {
    if (id === '' || id == null) {
      return this.httpClient
        .put<T>(`${this.url}/${endpoint}`, item)
        .pipe(map((data: any) => data as T));
    } else if (endpoint !== '' && endpoint != null) {
      return this.httpClient
        .put<T>(`${this.url}/${endpoint}/${id}`, item)
        .pipe(map((data: any) => data as T));
    } else {
      return this.httpClient
        .put<T>(`${this.url}/${id}`, item)
        .pipe(map((data: any) => data as T));
    }
  }

  get(id: any, endpoint: string = ''): Observable<T> {
    if (endpoint) {
      return this.httpClient
        .get(`${this.url}/${endpoint}/${id}`)
        .pipe(map((data: any) => data as T));

    } else if (id)  {
      return this.httpClient
        .get(`${this.url}/${id}`)
        .pipe(map((data: any) => data as T));
    } else {
      return this.httpClient
        .get(`${this.url}`)
        .pipe(map((data: any) => data as T));
    }
  }

  delete(id: number, endpoint: string = '', options?: any) {
    if (options) {
      return this.httpClient
        .delete(`${this.url}/${endpoint}`, options);
    }
    else if (endpoint !== '' && endpoint != null && id > 0) {
      return this.httpClient
        .delete(`${this.url}/${endpoint}/${id}`);
    } else if (id > 0) {
      return this.httpClient
        .delete(`${this.url}/${id}`)
        .pipe(map((data: any) => data as T));
    } else {
      return this.httpClient
      .delete(`${this.url}/${endpoint}`);
    }
  }

}
