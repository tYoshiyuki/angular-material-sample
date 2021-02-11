import { ElementRef, Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { timer, Subscription } from 'rxjs';
import { LoadingComponent } from './loading.component';
import { DynamicOverlay } from './overlay/dynamic-overlay';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Injectable()
export class LoadingService {
  constructor(
    private dynamicOverlay: DynamicOverlay,
    private overlay: Overlay
  ) {}

  public showGlobal(): OverlayRef {
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

  public hideGlobal(overlayRef: OverlayRef) {
    overlayRef.detach();
  }

  public show(elRef: ElementRef): LoadingRef | null {
    if (elRef) {
      const result: LoadingRef = { subscription: null, overlayRef: null };
      result.subscription = timer(500).subscribe(() => {
        this.dynamicOverlay.setContainerElement(elRef.nativeElement);
        const positionStrategy = this.dynamicOverlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically();
        result.overlayRef = this.dynamicOverlay.create({
          positionStrategy,
          hasBackdrop: true,
        });
        result.overlayRef.attach(new ComponentPortal(LoadingComponent));
      });
      return result;
    } else {
      return null;
    }
  }

  public hide(result: LoadingRef | null) {
    if (result) {
      result.subscription?.unsubscribe();
      if (result.overlayRef) {
        result.overlayRef.detach();
      }
    }
  }
}

export declare type LoadingRef = {
  subscription: Subscription | null;
  overlayRef: OverlayRef | null;
};
