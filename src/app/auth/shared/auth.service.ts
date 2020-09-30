import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/services/base.service';
import { environment } from '@env/environment';
import { ApiService } from '@app/shared/services';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthEndPoints } from '@app/shared/endpoints/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any> {

  constructor(
    httpClient: HttpClient,
    private apiService: ApiService,
    private authEndPoints: AuthEndPoints,
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    super(
      httpClient,
      environment.api_sensor_uri);
  }

  postLogin(body: any): Observable<any> {
    this.http = new HttpClient(this.httpBackend);
    return this.http.post(environment.api_sensor_uri + '/' + this.apiService.authApi + this.authEndPoints.postLoginEndPoint, body);
  }

  register(body: any): Observable<any> {
    this.http = new HttpClient(this.httpBackend);
    return this.http.post(environment.api_sensor_uri + '/' + this.apiService.authApi + this.authEndPoints.postRegisterEndPoint, body);
  }


}
