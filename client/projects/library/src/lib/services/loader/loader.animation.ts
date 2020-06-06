import { AnimationController } from '@ionic/angular';

export function loaderAnimation(animationController: AnimationController, elem: HTMLElement) {
  return animationController
    .create()
    .addElement(elem)
    .duration(2000)
    .iterations(Infinity)
    .easing('ease-out')
    .keyframes([
      { offset: 0, transform: 'scaleX(1)' },
      { offset: 0.25, transform: 'scaleX(0)' },
      { offset: 0.5, transform: 'scaleX(-1)' },
      { offset: 0.75, transform: 'scaleX(0)' },
      { offset: 1, transform: 'scaleX(1)' },
    ]);
}
