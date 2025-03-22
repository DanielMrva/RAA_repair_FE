import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDoctypeButtonComponent } from './backup-doctype-button.component';

describe('BackupDoctypeButtonComponent', () => {
  let component: BackupDoctypeButtonComponent;
  let fixture: ComponentFixture<BackupDoctypeButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackupDoctypeButtonComponent]
    });
    fixture = TestBed.createComponent(BackupDoctypeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
