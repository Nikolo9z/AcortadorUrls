import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcortarUrlsService } from '../../services/acortar-urls.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css'
})
export class RedirectComponent implements OnInit {
  title = 'Redirect';
  code!:string;
  constructor(
    private route: ActivatedRoute,
    private readonly _acortarUrlsService: AcortarUrlsService
  ) { }
  
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.code = params['code'];
  });
  this.GetUrlOriginal(this.code);
  }
  GetUrlOriginal(code:string) {
    this._acortarUrlsService.GetOriginalUrl(this.code).subscribe(
      response => {
        if (response.statusCode === 200) {
          window.location.href = response.originalURL;
        }
    });
  }
}
