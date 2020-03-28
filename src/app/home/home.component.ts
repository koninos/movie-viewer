import { Component } from '@angular/core';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public pageTitle: string = 'Welcome to Movie Viewer';
  public faHeartbeat = faHeartbeat;

}