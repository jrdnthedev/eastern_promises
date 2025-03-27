import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme.service';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  themes = ['', 'dark'];
  themeService = inject(ThemeService);
  isThemeDark = signal(false);

  toggleTheme() {
    this.isThemeDark.update((isDark) => !isDark);
    this.themeService.setTheme(this.isThemeDark() ? 'dark' : '');
  }
}
