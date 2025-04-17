import { Directive } from '@angular/core';

@Directive({
  selector: '[appKeytrap]',
})
export class KeytrapDirective {
  private previouslyFocusedElement: HTMLElement | null = null;

  constructor() {}

  ngOnInit() {
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    this.initializeKeytrap();
  }

  initializeKeytrap() {
    const container = document.querySelector('#crud-modal');
    const elements: NodeListOf<HTMLElement> = container!.querySelectorAll(
      'a, input:not([disabled]), button, select'
    );
    elements[0].focus();
    elements.forEach((element) => {
      element.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          if (event.shiftKey) {
            const previousElement = this.getPreviousElement(
              elements,
              event.target as HTMLElement
            );
            if (previousElement) {
              previousElement.setAttribute('tabindex', '0');
              previousElement.focus();
            }
          } else {
            const nextElement = this.getNextElement(
              elements,
              event.target as HTMLElement
            );
            if (nextElement) {
              nextElement.setAttribute('tabindex', '0');
              nextElement.focus();
            }
          }
        }
      });
    });
  }

  getNextElement(
    elements: NodeListOf<HTMLElement>,
    currentElement: HTMLElement
  ): HTMLElement | null {
    const currentIndex = Array.from(elements).indexOf(currentElement);
    const nextIndex = (currentIndex + 1) % elements.length;
    return elements[nextIndex] || null;
  }

  getPreviousElement(
    elements: NodeListOf<HTMLElement>,
    currentElement: HTMLElement
  ): HTMLElement | null {
    const currentIndex = Array.from(elements).indexOf(currentElement);
    const previousIndex =
      (currentIndex - 1 + elements.length) % elements.length;
    return elements[previousIndex] || null;
  }

  ngOnDestroy() {
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }
}
