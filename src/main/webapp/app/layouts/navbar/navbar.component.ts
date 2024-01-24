import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { faEye,faKitMedical,faWheatAlt,faDna, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { concat } from 'rxjs';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faCoffee = faEye;
  faKitMedical =faKitMedical;
  faHouse=faWheatAlt;
  faDna=faDna;
  faUtensils=faUtensils;
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];

  collapsed = true;

  @Output() inToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth = 0;
  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  toggleCollapse(): void {
    if (document.body.classList.contains('toggle-sidebar')) {
      document.body.classList.remove('toggle-sidebar');
    } else {
      document.body.classList.add('toggle-sidebar');
    }
  }
  colapss(): void {
    const box = document.getElementById('box');

    if (box?.classList.contains('collapsed')) {
      box.classList.remove('collapsed');
    } else {
      box?.classList.add('collapsed');
    }
    this.hiden();
  }

  hiden(): void {
    const show = document.getElementById('components-nav');

    show?.classList.toggle('show');
  }


//////////////////////////////////
colapss1(): void {
  const box1 = document.getElementById('box1');

  if (box1?.classList.contains('collapsed')) {
    box1.classList.remove('collapsed');
  } else {
    box1?.classList.add('collapsed');
  }
  this.hiden1();
}

hiden1(): void {
  const show = document.getElementById('components-nav1');

  show?.classList.toggle('show');
}

colapss2(): void {
  const box1 = document.getElementById('box2');

  if (box1?.classList.contains('collapsed')) {
    box1.classList.remove('collapsed');
  } else {
    box1?.classList.add('collapsed');
  }
  this.hiden2();
}

hiden2(): void {
  const show = document.getElementById('components-nav2');

  show?.classList.toggle('show');
}
}