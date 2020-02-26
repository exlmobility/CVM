import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MakeRequestPage } from './make-request.page';

describe('MakeRequestPage', () => {
  let component: MakeRequestPage;
  let fixture: ComponentFixture<MakeRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MakeRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
