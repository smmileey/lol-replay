import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson'
})
export class PrettyJsonPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return JSON ? JSON.stringify(value, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
  }
}
