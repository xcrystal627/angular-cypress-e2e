import { Pipe, PipeTransform, inject } from '@angular/core';
import { IExam } from '../models/exam';

@Pipe({
  name: 'ExamsPipe',
  standalone: true
})
export class ExamsPipe implements PipeTransform {
  transform(allExams: Array<IExam>, date: string): Array<IExam> {
    if (!date || !allExams?.length) {
      return [];
    }

    return allExams.filter(exam => exam.details.exam_date === date);
  }
}
