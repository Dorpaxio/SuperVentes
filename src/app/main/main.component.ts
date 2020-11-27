import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isDark: boolean;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.isDark = this.themeService.currentTheme === 'dark';
  }

  switchTheme(): void {
    this.themeService.switchTheme();
  }

}
