import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  slides = [{ img: 'https://via.placeholder.com/600.png/09f/fff' }];

  slideConfig = { slidesToShow: 1, slidesToScroll: 1, dots: true, infinite: false, autoplay: true };
  account: Account | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  slickInit(e: any): void {
    console.log('slick initialized');
  }
  breakpoint(e: any): void {
    console.log('breakpoint');
  }
  afterChange(e: any): void {
    console.log('afterChange');
  }
  beforeChange(e: any): void {
    console.log('beforeChange');
  }
}
