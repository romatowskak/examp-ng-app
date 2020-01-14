import { MatDialog } from '@angular/material/dialog';
import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { ActionItem, TasksService } from './../services/tasksService/tasks.service';
import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { ConfirmationDialogComponent } from '../confirmationDialog/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  providers: [DaysLeftCountedPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnChanges {
  @Input() item: ActionItem | undefined;
  @Input() id: string;
  @Input() errorMessage: string | undefined;
  @Input() isLoadingActionItem: boolean;
  daysLeftVisibility: boolean;

  constructor(private dialog: MatDialog, private tasksService: TasksService, private router: Router) {}

  ngOnChanges() {
    if (this.item) {
      const itemDueDate = this.item.dueDate;
      this.daysLeftVisibility = !!itemDueDate;
    }
  }
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '380px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.tasksService.deteleActionItem(this.id);
        this.item = undefined;
        this.isLoadingActionItem = false;
        this.errorMessage = undefined;
        this.router.navigate(['/items']);
        this.ngOnChanges();
      }
    });
  }
}
