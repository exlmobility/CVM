import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterMpinPage } from './enter-mpin.page';

describe('EnterMpinPage', () => {
  let component: EnterMpinPage;
  let fixture: ComponentFixture<EnterMpinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterMpinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterMpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
