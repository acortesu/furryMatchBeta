import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})

export class OnBoardingComponent implements AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  prevComponentHeight: number = 0;

  @ViewChild('lastComponent') prevComponent!: ElementRef;

  ngAfterViewInit() {
    const lastComponentHeight = this.prevComponent.nativeElement.offsetHeight;
    const footerElement = document.querySelector('.footer') as HTMLElement;
    if (footerElement) {
      footerElement.style.marginTop = lastComponentHeight + 15 + 'px';
    } else {
      console.error('No se encontró el elemento .footer');
    }
  }
}

