import { Pipe, PipeTransform, inject } from '@angular/core';
import { IExam } from '../models/exam';

@Pipe({
  name: 'EllipsisPipe',
  standalone: true
})
export class EllipsisPipe implements PipeTransform {
  transform(fullText: string, wordLimit = 5): { displayText: string, hasTruncate: boolean } | undefined {
    if (!fullText) {
      return undefined;
    }
    const words = fullText.split(' ');
    if (words.length <= wordLimit) {
      return { displayText: fullText, hasTruncate: false };
    }

    return { displayText: `${words.slice(0, wordLimit).join(' ')}`, hasTruncate: true };
  }
}
