import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AcortarUrlsService } from '../../services/acortar-urls.service';
import { PostAcortadorUrlRequest } from '../../models/PostAcortadorUrlRequest';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HeaderComponent],
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
          this.showInfo = true;
          this.code = environment.urlOrigen+ response.originalURL;
        }
      }
    );
  }
  copiarAlPortapapeles() {
    navigator.clipboard.writeText(this.code).then(() => {
      console.log('Texto copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar al portapapeles: ', err);
    });
  }


}
