import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  @Input() title = 'New Card List';
  @Input() btnText = 'Add New';
  @Input() pageLink = '/';
}
