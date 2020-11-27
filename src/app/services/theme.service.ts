import {Injectable} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private nbThemeService: NbThemeService) {
  }

  get currentTheme(): string {
    return this.nbThemeService.currentTheme;
  }

  checkTheme() {
    const theme = localStorage.getItem('theme') || 'default';
    if (this.currentTheme !== theme) {
      this.nbThemeService.changeTheme(theme);
    }
  }

  switchTheme() {
    const newTheme = this.currentTheme === 'default' ? 'dark' : 'default';
    this.nbThemeService.changeTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }
}
