import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActionItemsComponent } from './action-items/action-items.component';
import { DaysLeftToDeadlineService } from './services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { TasksService } from './services/tasksService/tasks.service';
import { CircleColorPipe } from './pipes/circleColorPipe/circle-color.pipe';
import { AddItemComponent } from './add-item/add-item.component';
import { ProjectsService } from './services/projects/projects.service';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ActionItemsComponent,
    CircleColorPipe,
    AddItemComponent,
    ItemDetailsComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: 'items',
        component: ActionItemsComponent
      },
      {
        path: 'items/:id',
        component: ActionItemsComponent
      },
      {
        path: 'details/:id',
        component: ItemDetailsComponent
      }
    ])
  ],
  providers: [TasksService, DaysLeftToDeadlineService, ProjectsService, CircleColorPipe],
  bootstrap: [AppComponent],
  entryComponents: [AddItemComponent]
})
export class AppModule {}
