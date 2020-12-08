import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {AuthService} from '../services/auth.service';
import {MembresService} from '../services/membres.service';
import {NbPopoverDirective} from '@nebular/theme';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  isDark: boolean;
  popoverText = '';
  timer: number;

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  addedToPanierSub: Subscription;

  constructor(private themeService: ThemeService,
              private authService: AuthService,
              private membresService: MembresService) {
  }

  ngOnInit(): void {
    this.isDark = this.themeService.currentTheme === 'dark';
    this.addedToPanierSub = this.membresService.addedToPanier.subscribe(nom => {
      this.popoverText = `L'article suivant a été ajouté à votre panier : ${nom}.`;
      this.triggerPopover();
    });
  }

  ngOnDestroy() {
    this.addedToPanierSub.unsubscribe();
  }

  triggerPopover() {
    if (!this.popover) {
      return;
    }

    this.popover.show();
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.popover.hide();
    }, 2000);
  }

  switchTheme(): void {
    this.themeService.switchTheme();
  }

  get connected(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

}
