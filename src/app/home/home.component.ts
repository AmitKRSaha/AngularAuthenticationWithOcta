import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OktaAuthWrapper } from '../shared';

@Component({
  selector:'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  username;
  password;

  constructor(private oauthService: OAuthService,
    private oktaAuthWrapper: OktaAuthWrapper) {
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  loginWithPassword() {
    this.oktaAuthWrapper.login(this.username, this.password)
      .catch(err => console.error('error logging in', err));
  }
}