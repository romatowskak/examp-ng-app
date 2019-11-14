import { DateCountService } from "./../date-count.service";
import { TasksService } from "./../tasks.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { map } from "rxjs/operators";

@Component({
  selector: "app-action-items",
  templateUrl: "./action-items.component.html",
  styleUrls: ["./action-items.component.css"]
})
export class ActionItemsComponent implements OnInit {
  dataSource;
  loading = true;
  displayedColumns: string[] = ["title", "type", "completed", "dueDate", "daysLeft"];
  constructor(private tasksService: TasksService, private dateCountService: DateCountService) {}
  ngOnInit() {
    this.tasksService
      .getAllTasks()
      .pipe(
        map(items => {
          items.map(item => {
            const dueDayCounted = this.dateCountService.countDate(item.dueDate);
            const newItem = { ...item, dueDay: dueDayCounted };
            // objects now have a new property dueDay with a value calculated in the dateCountService
            console.log(newItem);
            return item;
          });
        })
      )
      .subscribe(tasks => {
        this.dataSource = tasks;
        this.loading = false;
      });
  }
}
