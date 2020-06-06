import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description `eta` pipe converts server defined eta string to the string format that can be used in css content property
 * @author Syed Muhammad Taha
 * @export
 * @class EtaPipe
 */
@Pipe({ name: 'eta' })
export class EtaPipe implements PipeTransform {
  transform(value: string): string {
    const [time, unit] = value.split(' ');

    return `${time}\n${unit.startsWith('M') ? 'minute' : 'hour'}${time !== '1' ? 's' : 0}`;
  }
}
