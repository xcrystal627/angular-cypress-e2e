import { ApplicationRef, Component, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IExam } from '../models/exam';
import { AuthService } from '../providers/auth.service';
import { DynamicComponentService } from '../providers/dynamic-component.service';
import { FullTextPopupComponent } from './fulltext/fulltext.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private fullTextComponent?: ComponentRef<FullTextPopupComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  exams: IExam[];
  dataSource = new MatTableDataSource<IExam>([]);

  displayedColumns: string[] = [
    'details.student.firstName',
    'details.school.schoolName',
    'details.summary',
    'details.subject',
    'details.course_number',
    'details.grade_value',
    'details.level',
    'details.semester',
    'details.discipline',
    'details.graded_url',
    'details.status',
  ];

  displayedLabels = {
    id: 'ID',
    'details.student.firstName': 'Name',
  };

  users: any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService,
    private dynamicComponentService: DynamicComponentService
  ) { }


  ngAfterViewInit() { }

  ngOnInit(): void {
    this.exams = this.route.snapshot.data.exams;
    this.users = this.route.snapshot.data.users;
    this.dataSource = new MatTableDataSource<IExam>(this.exams);
    this.dataSource.paginator = this.paginator;
  }

  changeStatus(e, exam: IExam) {
    let status = +e.value;
    let user = this.users.find((u) => u.id == exam.details.student.id);

    let payload: IExam = { ...exam };
    payload.details.status = status;

    this.auth.updateUser({ id: user.id }, { ...user, status }).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Successfully Updated User');
      },
      (err) => {
        this.toastr.error('Update failed');
      }
    );

    this.auth.updateExam(payload).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Successfully Updated Exam');
      },
      (err) => {
        this.toastr.error('Update failed');
      }
    );
  }

  protected handlerOpenFullText(event: Event, fullText: string) {
    event.stopPropagation();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    if (this.fullTextComponent) {
      this.removePopup();

      return;
    }
    this.fullTextComponent = this.dynamicComponentService.resolveComponentFactory(FullTextPopupComponent);

    const instance = this.fullTextComponent.instance;
    instance.fullText = fullText;
    instance.positionConfig = {
      top: rect.top + rect.height,
      left: rect.left
    }
    const subs = instance.removeContent.subscribe(() => {
      this.removePopup();
      subs.unsubscribe();
    })
    this.dynamicComponentService.addToBody(this.fullTextComponent);
  }

  private removePopup() {
    this.dynamicComponentService.remove(this.fullTextComponent);
    this.fullTextComponent = undefined;
  }

  ngOnDestroy(): void {
    this.removePopup();
  }
}
