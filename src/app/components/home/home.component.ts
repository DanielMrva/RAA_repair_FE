import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { User } from '@app/graphql/schemas';
import { Store } from '@ngrx/store';
import { AppState } from '@app/_store/app.state';
import { selectIsAuthenticated, selectUserName } from '@app/_store/_auth-store/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userName$
  isAuthenticated$

  loading = false;
  // user: User;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.userName$ = this.store.select(selectUserName);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  
    }

}
