import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from, of, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loaderInstanceCounter = 0;

  constructor(private readonly loadingController: LoadingController) {}

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
            .then((newLoader) => newLoader.present().then(() => newLoader))
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
