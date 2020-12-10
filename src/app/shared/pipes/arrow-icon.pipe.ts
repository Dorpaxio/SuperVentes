import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrowIcon'
})
export class ArrowIconPipe implements PipeTransform {

  transform(value: number): string {
    return value > 1 ? 'arrow-left-outline' : 'trash';
  }

}
