import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PostAcortadorUrlResponse } from '../models/PostAcortadorUrlResponse';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcortarUrlsService {
  private readonly _http= inject(HttpClient);
  private readonly apiUrl=environment.apiUrl;
  private readonly paramApikey=environment.paramApikey;
  private readonly apikey=environment.apiKey;
  constructor() { }

  PostAcortarUrl(url: string):Observable<PostAcortadorUrlResponse>{
    const peticion= this._http.post<PostAcortadorUrlResponse>(this.apiUrl,{
      "url": url
    },
    {
      headers: {
        // 'Content-Type': 'application/json',
        // 'access-control-allow-origin': '*',
        [this.paramApikey]: this.apikey
      }
    });
    return peticion;
  }
  GetOriginalUrl(code: string):Observable<PostAcortadorUrlResponse>{
    const peticion= this._http.get<PostAcortadorUrlResponse>(this.apiUrl,{
      headers: {
        // 'Content-Type': 'application/json',
        // 'access-control-allow-origin': '*',
        [this.paramApikey]: this.apikey
      },
      params:{
        code: code
      }
    });
    return peticion;
  }
}
