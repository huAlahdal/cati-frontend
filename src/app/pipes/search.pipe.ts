import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PhoneFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      const rVal =
                  (val.id === Number(args))
                || (val.phone.toLocaleLowerCase().includes(args))
                || (val.date.toLocaleLowerCase().includes(args));

      return rVal;
    })

  }

}
