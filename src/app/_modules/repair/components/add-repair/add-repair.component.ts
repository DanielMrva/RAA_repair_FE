import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_TECH, ACCESS_LEVEL_USER } from '@app/utils/constants';


@Component({
  selector: 'app-add-repair',
  templateUrl: './add-repair.component.html',
  styleUrls: ['./add-repair.component.css']
})

export class AddRepairComponent {

  ADMIN_ACCESS = ACCESS_LEVEL_ADMIN;
  USER_ACCESS = ACCESS_LEVEL_USER;
  TECH_ACCESS = ACCESS_LEVEL_TECH;

  constructor (
    private authService: AuthService,
    private store: Store<AppState>
  ) {


  }

}
