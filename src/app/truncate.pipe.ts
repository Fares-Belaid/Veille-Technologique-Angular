import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, leng:number=20, suf:string='...'): any {
    return value.substring(0,leng)+(value.length>leng?suf:'');
  }

}
