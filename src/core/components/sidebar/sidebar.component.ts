import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeSwitcherComponent } from '../../../components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, ThemeSwitcherComponent],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isHidden = true;
  isMobile!: boolean;
  @ViewChild('aside') asideDiv!: ElementRef;
  @ViewChild('asideBtn') asideBtnDiv!: ElementRef;

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.isMobile = width < 768;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Check if the click occurred outside the target div
    if (this.isMobile) {
      if (
        !this.isHidden &&
        this.asideDiv &&
        !this.asideBtnDiv.nativeElement.contains(event.target) &&
        !this.asideDiv.nativeElement.contains(event.target)
      ) {
        console.log('Click occurred outside the target div!');
        this.isHidden = true;
      }
    }
  }
}
