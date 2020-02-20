import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetMpinPage } from './set-mpin.page';

describe('SetMpinPage', () => {
  let component: SetMpinPage;
  let fixture: ComponentFixture<SetMpinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetMpinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetMpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
