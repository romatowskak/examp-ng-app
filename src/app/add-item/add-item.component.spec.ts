import { Project, ProjectsService } from './../services/projects/projects.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddItemComponent } from './add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

const dialogMock = {
  close: () => {}
};

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let projectsService: ProjectsService;
  let nameField;
  let projectField;
  let dueDateField;
  let descriptionField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddItemComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatDialogModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    projectsService = TestBed.get(ProjectsService);
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nameField = component.dialogForm.controls.name;
    projectField = component.dialogForm.controls.project;
    dueDateField = component.dialogForm.controls.dueDate;
    descriptionField = component.dialogForm.controls.description;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.dialogForm.valid).toBeFalsy();
  });

  it('name field invalid when empty', () => {
    expect(nameField.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let errors = {};
    errors = nameField.errors || {};
    nameField.setValue('');
    expect(nameField.hasError('required')).toBeTruthy();
  });

  it('projectName field invalid when empty', () => {
    expect(projectField.valid).toBeFalsy();
  });

  it('projectName field validity', () => {
    let errors = {};
    errors = projectField.errors || {};
    projectField.setValue('');
    expect(projectField.hasError('required')).toBeTruthy();
  });

  it('dueDate field valid when empty', () => {
    const dueDateField = component.dialogForm.controls.dueDate;
    expect(dueDateField.valid).toBeTruthy();
  });

  it('description field valid when empty', () => {
    const descriptionField = component.dialogForm.controls.description;
    expect(descriptionField.valid).toBeTruthy();
  });

  it('form valid when nameField and projectField filled', () => {
    nameField.setValue('test');
    projectField.setValue('test');
    expect(component.dialogForm.valid).toBeTruthy();
  });

  it('button disabled when nameField and projectField empty', () => {
    const createButton = fixture.debugElement.query(By.css('.create'));
    fixture.detectChanges();
    expect(createButton.nativeElement.disabled).toBeTruthy();
  });

  it('button active when nameField and projectField filled', () => {
    const createButton = fixture.debugElement.query(By.css('.create'));
    nameField.setValue('test');
    projectField.setValue('test');
    fixture.detectChanges();
    expect(createButton.nativeElement.disabled).toBeFalsy();
  });

  it('on createActionItem() form disabled', () => {
    expect(component.dialogForm.valid).toBeFalsy();
    nameField.setValue('test name');
    projectField.setValue('test project');
    expect(component.dialogForm.valid).toBeTruthy();
    component.createActionItem();
    expect(nameField.enabled).toBe(false);
    expect(projectField.enabled).toBe(false);
    expect(dueDateField.enabled).toBe(false);
    expect(descriptionField.enabled).toBe(false);
  });

  it('spinner displayed on "createActionItem()"', fakeAsync(() => {
    component.isCreatingActionItem = false;
    component.createActionItem();
    tick();
    fixture.detectChanges();
    expect(component.isCreatingActionItem).toBe(true);
    tick(1000);
    fixture.detectChanges();
    expect(component.isCreatingActionItem).toBe(false);
  }));

  it('should retrieve projects names from projectsService', () => {
    const projectsNames: Project[] = [{ name: 'CASD Wilson & Lamberton Middle Schools' }];
    spyOn(projectsService, 'getProjectsNames').and.returnValue(of(projectsNames));
    component.ngOnInit();
    expect(component.projects.length).toEqual(projectsNames.length);
  });

  it('button active when nameField and projectField filled', () => {
    const createButton = fixture.debugElement.query(By.css('.create'));
    nameField.setValue('test');
    projectField.setValue('test');
    fixture.detectChanges();
    expect(createButton.nativeElement.disabled).toBeFalsy();
  });

  it('"createActionItem()" should call "close()"', fakeAsync(() => {
    const spyObj = spyOn(component.dialogRef, 'close');
    component.createActionItem();
    tick(1000);
    fixture.detectChanges();
    expect(spyObj).toHaveBeenCalled();
  }));

  it('should not show any error message', () => {
    const nameError = fixture.debugElement.query(By.css('.nameError'));
    const projectError = fixture.debugElement.query(By.css('.projectError'));
    expect(nameError).toBeFalsy();
    expect(projectError).toBeFalsy();
  });
});
