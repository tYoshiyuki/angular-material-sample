import {
  Overlay,
  OverlayKeyboardDispatcher,
  OverlayPositionBuilder,
  ScrollStrategyOptions,
  OverlayOutsideClickDispatcher
} from '@angular/cdk/overlay';
import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  NgZone,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { DynamicOverlayContainer } from './dynamic-overlay-container';
import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT, Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DynamicOverlay extends Overlay {

  private readonly _dynamicOverlayContainer: DynamicOverlayContainer;
  private renderer: Renderer2;

  constructor(scrollStrategies: ScrollStrategyOptions,
              _overlayContainer: DynamicOverlayContainer,
              _componentFactoryResolver: ComponentFactoryResolver,
              _positionBuilder: OverlayPositionBuilder,
              _keyboardDispatcher: OverlayKeyboardDispatcher,
              _injector: Injector,
              _ngZone: NgZone,
              @Inject(DOCUMENT) _document: any,
              _directionality: Directionality,
              _location: Location,
              _outsideClickDispatcher: OverlayOutsideClickDispatcher,
              rendererFactory: RendererFactory2) {
    super(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder,
      _keyboardDispatcher, _injector, _ngZone, _document, _directionality, _location, _outsideClickDispatcher);
    this.renderer = rendererFactory.createRenderer(null, null);

    // eslint-disable-next-line no-underscore-dangle
    this._dynamicOverlayContainer = _overlayContainer;
  }

  public setContainerElement(containerElement: HTMLElement): void {
    this.renderer.setStyle(containerElement, 'transform', 'translateZ(0)');
    // eslint-disable-next-line no-underscore-dangle
    this._dynamicOverlayContainer.setContainerElement(containerElement);
  }
}
