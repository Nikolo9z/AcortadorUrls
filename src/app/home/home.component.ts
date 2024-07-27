import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AcortarUrlsService } from '../../services/acortar-urls.service';
import { PostAcortadorUrlRequest } from '../../models/PostAcortadorUrlRequest';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  urlInput!: FormGroup;
  showInfo = false;
  code:string = '';
  constructor(
    private readonly _acortarUrlsService: AcortarUrlsService
  ) { }
  ngOnInit(): void {
    this.crearFormulario();
  }
  crearFormulario() {
    this.urlInput = new FormGroup({
      url: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern('https?://.+')]),
    });
  }
  InsertarUrl() {
    if (this.urlInput.invalid) {
      return;
    }
    this._acortarUrlsService.PostAcortarUrl(this.urlInput.value.url).subscribe(
      response => {
        if (response.statusCode === 200) {
          console.log(response);
          this.showInfo = true;
          this.code = response.originalURL;
        }
      }
    );
  }

}
