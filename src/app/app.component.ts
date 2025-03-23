import { Component } from '@angular/core';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, HeaderComponent, RouterModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard';
}
