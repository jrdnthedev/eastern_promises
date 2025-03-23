import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = 'light-theme';
  constructor() {}

  setTheme(theme: string) {
    this.currentTheme = theme;
    document.body.className = theme;
  }

  getTheme() {
    return this.currentTheme;
  }
}
