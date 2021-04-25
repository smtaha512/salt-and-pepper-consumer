import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loaderInstanceCounter = 0;

  constructor(private readonly loadingController: LoadingController) {}

  presentLoader() {
    return from(this.loadingController.getTop()).pipe(
      switchMap((loader) => {
        if (this.loaderInstanceCounter >= 1 || loader) {
          return of(loader);
        }
        this.loaderInstanceCounter++;
        return from(
          this.loadingController
            .create({ backdropDismiss: false, keyboardClose: false, message: 'Please wait!' })
            .then((newLoader) => newLoader.present().then(() => newLoader))
        );
      })
    );
  }

  hideLoader() {
    if (this.loaderInstanceCounter >= 1) {
      this.loaderInstanceCounter--;
    }

    return from(
      this.loadingController.getTop().then((loader) => {
        if (this.loaderInstanceCounter < 1 && loader) {
          return from(loader.dismiss());
        }
        return of(true);
      })
    );
  }
}
