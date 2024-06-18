import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Md5 } from 'ts-md5/dist/md5';
import { IExam } from '../models/exam';
import { AuthService } from '../providers/auth.service';
import { IDatePickerConfig, IDay } from 'ng2-date-picker';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  exams: IExam[];
  passwordChangeForm: FormGroup;
  user: IExam;

  protected datePickerConfig: IDatePickerConfig;
  protected selectedDate: string;
  protected currentDate: dayjs.Dayjs;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.datePickerConfig = {
      dayBtnCssClassCallback: this.dayBtnCssClassCallback.bind(this)
    };
    this.currentDate = dayjs();
  }

  ngOnInit(): void {
    this.exams = this.route.snapshot.data.exams;

    if (this.exams && this.exams.length) {
      this.user = this.exams[0];
    }

    this.passwordChangeForm = this.fb.group(
      {
        password: [null, Validators.required],
        retype_password: [null, Validators.required],
      },
      {
        validator: this.confirmPassword,
      }
    );
  }

  protected dayBtnCssClassCallback(day: dayjs.Dayjs): string {
    const date = day.format('YYYY-MM-DD');

    const checkDateHasExam = this.exams.find(exam => exam.details.exam_date === date);

    if (this.selectedDate === date) {
      return '';
    }

    if (checkDateHasExam) {
      return 'highlight-day';
    }

    return '';
  }

  protected handlerSelectDate(day: IDay) {
    this.selectedDate = day.date?.format('YYYY-MM-DD');
  }

  onSubmitForm() {
    if (!this.passwordChangeForm.valid) {
      return alert('form is not valid');
    }

    const user = this.auth.getLoggedInUser();
    const { password } = this.passwordChangeForm.value;

    this.auth
      .updateUser({ id: user.id }, {
        ...user,
        passwordHash: Md5.hashStr(password)
      })
      .subscribe((data) => {
        this.toastr.success('your password is changed. please login again');
        this.auth.logOut();
      });
  }

  confirmPassword(c: AbstractControl): { invalid: boolean; mismatch: boolean } {
    if (c.get('password') && c.get('retype_password')) {
      return c.get('password').value !== c.get('retype_password').value
        ? { invalid: true, mismatch: true }
        : null;
    } else {
      return { invalid: true, mismatch: true };
    }
  }
}
