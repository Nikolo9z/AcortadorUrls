import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AcortarUrlsService } from '../../services/acortar-urls.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css'
})
export class RedirectComponent implements OnInit {
  title = 'Redirect';
  code!:string;
  showSpinner = true;
  constructor(
    private route: ActivatedRoute,
    private readonly _acortarUrlsService: AcortarUrlsService,
    private router: Router
  ) { }
  
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.code = params['code'];
  });
  this.GetUrlOriginal(this.code);
  }

  GetUrlOriginal(code:string) {
    this.showSpinner = true;
    this._acortarUrlsService.GetOriginalUrl(this.code).subscribe(
      response => {
        if (response.statusCode === 200) {
          this.showSpinner = false;
          window.location.href = response.originalURL;
        }
        if (response.statusCode != 200) {
          this.showSpinner = false;
          this.router.navigate(['/']);
        }
    });
  }
}
