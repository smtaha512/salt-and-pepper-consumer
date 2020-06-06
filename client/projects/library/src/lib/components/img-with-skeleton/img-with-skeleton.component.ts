import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-img-with-skeleton',
  templateUrl: './img-with-skeleton.component.html',
  styleUrls: ['./img-with-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgWithSkeletonComponent {
  @Input() alt: string;
  @Input() height = 200;
  @Input() src: string;

  private readonly isLoaded$$ = new BehaviorSubject(false);

  imageLoaded() {
    this.isLoaded$$.next(true);
  }

  get isLoaded$() {
    return this.isLoaded$$.asObservable();
  }
}
