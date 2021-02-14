import { ElementRef, Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoadingComponent } from './loading.component';
import { DynamicOverlay } from './overlay/dynamic-overlay';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

/**
 * ローディング処理を行うためのサービスです。
 */
@Injectable()
export class LoadingService {
  constructor(
    private dynamicOverlay: DynamicOverlay,
    private overlay: Overlay
  ) {}

  /**
   * 画面全体にローディング表示を行います。
   */
  showGlobal(): OverlayRef {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });
    overlayRef.attach(new ComponentPortal(LoadingComponent));
    return overlayRef;
  }

  /**
   * ローディングを非表示にします。
   *
   * @param overlayRef
   */
  hide(overlayRef: OverlayRef | null) {
    if (overlayRef){
      overlayRef.detach();
    }
  }

  /**
   * 指定した要素に対してローディング表示を行います。
   *
   * @param elRef
   */
  show(elRef: ElementRef): OverlayRef | null {
    if (elRef) {
      this.dynamicOverlay.setContainerElement(elRef.nativeElement);
      const positionStrategy = this.dynamicOverlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
      const loadingRef = this.dynamicOverlay.create({
        positionStrategy,
        hasBackdrop: true,
      });
      loadingRef.attach(new ComponentPortal(LoadingComponent));
      return loadingRef;
    } else {
      return null;
    }
  }
}
