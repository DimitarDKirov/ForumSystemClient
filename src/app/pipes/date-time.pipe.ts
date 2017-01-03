import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    var date = new Date(value);
    return date.toLocaleDateString('fr') + " - " + date.toLocaleTimeString('fr');
  }

}
