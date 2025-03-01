import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { TechNavComponent } from './tech-nav/tech-nav.component';
import { OrgRadiosNavigatorComponent } from '@app/_components/utilComponents/org-radios-navigator/org-radios-navigator.component';
import { RadioSnMNkNavigatorComponent } from '@app/_components/utilComponents/radio-sn-mnk-navigator/radio-sn-mnk-navigator.component';
import { RepairByTagNavigatorComponent } from '@app/_components/utilComponents/repair-by-tag-navigator/repair-by-tag-navigator.component';
import { AuthService } from '@app/services/auth/auth.service';

import { StoreModule } from '@ngrx/store';
import { authReducer } from '@app/_store/_auth-store/auth.reducers';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  declarations: [
    HeaderComponent,
    AdminNavComponent,
    UserNavComponent,
    TechNavComponent,
    OrgRadiosNavigatorComponent,
    RadioSnMNkNavigatorComponent,
    RepairByTagNavigatorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    UtilityModule,
    StoreModule.forFeature('auth', authReducer)
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    AuthService
  ]
})
export class NavModule { }
