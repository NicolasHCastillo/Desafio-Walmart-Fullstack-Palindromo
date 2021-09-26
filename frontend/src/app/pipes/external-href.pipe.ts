import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'externalHref'
})
export class ExternalHrefPipe implements PipeTransform {

  transform(value: string): string {
    return /^https?/.test(value) ? value : `https://${value}`;
  }

}
