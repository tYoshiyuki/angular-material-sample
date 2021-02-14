import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

/**
 * 動的にOverlayContainerを指定するためのクラスです。
 */
@Injectable({
  providedIn: 'root',
})
export class DynamicOverlayContainer extends OverlayContainer {
  public setContainerElement(containerElement: HTMLElement): void {
    // eslint-disable-next-line no-underscore-dangle
    this._containerElement = containerElement;
  }
}
