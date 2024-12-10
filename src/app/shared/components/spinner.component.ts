import { Component } from '@angular/core';
import { SpinnerService } from '@shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="overlay" *ngIf="spinnerService.isLoading$ | async">
      <div class="flex justify-center items-center min-h-screen">
        <div
          class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-orange-500"
        ></div>
      </div>
    </div>
  `,
})
export default class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) {}
}
