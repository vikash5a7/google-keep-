import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelSearch',
})
export class LabelSearchPipe implements PipeTransform {
  transform(labelList: any, SearchTeram: string) {
    if (!labelList || !SearchTeram) {
      return labelList;
    }
    return labelList.filter(
      (label: { name: string }) =>
        label.name.toLowerCase().indexOf(SearchTeram.toLowerCase()) !== -1
    );
  }
}
