import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorProfilePage } from './visitor-profile.page';

describe('VisitorProfilePage', () => {
  let component: VisitorProfilePage;
  let fixture: ComponentFixture<VisitorProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
