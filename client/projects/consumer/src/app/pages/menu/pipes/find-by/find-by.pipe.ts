import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findBy' })
export class FindByPipe implements PipeTransform {
  transform(arr: [], key: string, value: any): any {
    const found = arr.find((item) => item[key] === value);
    return found;
  }
}
