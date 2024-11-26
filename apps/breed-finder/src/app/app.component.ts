import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderPageComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [
    HeaderPageComponent,
    RouterModule,
    HttpClientModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
