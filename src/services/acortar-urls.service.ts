import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PostAcortadorUrlRequest } from '../models/PostAcortadorUrlRequest';
import { PostAcortadorUrlResponse } from '../models/PostAcortadorUrlResponse';

@Injectable({
  providedIn: 'root'
})
export class AcortarUrlsService {
  private readonly _http= inject(HttpClient);
  constructor() { }

  PostAcortarUrl(url: string):Observable<PostAcortadorUrlResponse>{
    const peticion= this._http.post<PostAcortadorUrlResponse>('/api/AcortadorURL',{
      "url": url
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      }
    });
    return peticion 
  }
}
