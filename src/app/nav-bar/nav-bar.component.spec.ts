import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { AlphabetComponent } from '../modules/alphabet/alphabet.component';
import { HomeComponent } from '../modules/home/home.component';
import { LeaderboardComponent } from '../modules/leaderboard/leaderboard.component';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let navDe: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [
        provideRouter([
          { path: 'home', component: HomeComponent },
          { path: 'alphabet', component: AlphabetComponent },
          { path: 'leaderboard', component: LeaderboardComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    navDe = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML', () => {
    it('Should render link with text "LEARN GREEK"', () => {
      const linkDe = navDe.query(By.css('[data-testid="learn-greek-link"]'));
      expect(linkDe).toBeTruthy();
      expect(linkDe.nativeElement.textContent).toContain('LEARN GREEK');
    });
    it('Should render link with text "ALPHABET"', () => {
      const linkDe = navDe.query(By.css('[data-testid="alphabet-link"]'));
      expect(linkDe).toBeTruthy();
      expect(linkDe.nativeElement.textContent).toContain('ALPHABET');
    });
    it('Should render link with text "LEADERBOARD"', () => {
      const linkDe = navDe.query(By.css('[data-testid="leaderboard-link"]'));
      expect(linkDe).toBeTruthy();
      expect(linkDe.nativeElement.textContent).toContain('LEADERBOARD');
    });
  });

  describe('CSS', () => {
    it('Each <a> tag should have class "button"', () => {
      const linkDe = navDe.queryAll(By.css('a'));
      linkDe.forEach((link) => {
        expect(link.nativeElement.classList).toContain('button');
      });
    });
  });

  describe('routing', () => {
    it('Should navigate to /home when "LEARN GREEK" link is clicked', async () => {
      const linkDe = navDe.query(By.css('[data-testid="learn-greek-link"]'));
      await linkDe.nativeElement.click();
      fixture.detectChanges();
      expect(TestBed.inject(Router).url)
        .withContext('should nav to /home')
        .toEqual(`/home`);
    });

    it('Should navigate to /alphabet when "ALPHABET" link is clicked', async () => {
      const linkDe = navDe.query(By.css('[data-testid="alphabet-link"]'));
      await linkDe.nativeElement.click();
      fixture.detectChanges();
      expect(TestBed.inject(Router).url)
        .withContext('should nav to /alphabet')
        .toEqual(`/alphabet`);
    });

    it('Should navigate to /leaderboard when "LEADERBOARD" link is clicked', async () => {
      const linkDe = navDe.query(By.css('[data-testid="leaderboard-link"]'));
      await linkDe.nativeElement.click();
      fixture.detectChanges();
      expect(TestBed.inject(Router).url)
        .withContext('should nav to /leaderboard')
        .toEqual(`/leaderboard`);
    });
  });
});
