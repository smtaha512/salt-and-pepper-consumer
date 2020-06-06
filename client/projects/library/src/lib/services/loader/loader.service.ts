import { Injectable } from '@angular/core';
import { AnimationController, LoadingController } from '@ionic/angular';
import { EMPTY, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { loaderAnimation } from './loader.animation';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loaderInstanceCounter = 0;

  constructor(private readonly loadingController: LoadingController, private readonly animationController: AnimationController) {}

  presentLoader() {
    this.loaderInstanceCounter++;
    return from(this.loadingController.getTop()).pipe(
      switchMap((loader) => {
        if (loader) {
          return of(loader);
        }
        return from(
          this.loadingController
            .create({ backdropDismiss: false, keyboardClose: false, spinner: null, cssClass: ['animated-loader'] })
            .then((newLoader) =>
              newLoader.present().then(() => {
                const animation = loaderAnimation(this.animationController, newLoader.querySelector('animated-loader'));
                animation.play();
                return newLoader;
              })
            )
        );
      })
    );
  }

  hideLoader() {
    if (this.loaderInstanceCounter >= 1) {
      this.loaderInstanceCounter--;
    }

    return from(this.loadingController.getTop()).pipe(
      switchMap((loader) => {
        if (this.loaderInstanceCounter < 1 && loader) {
          return from(loader.dismiss());
        }
        return EMPTY;
      })
    );
  }
}
