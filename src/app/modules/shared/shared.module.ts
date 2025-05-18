import { NgModule } from '@angular/core';

import { CardComponent } from '../../components/shared/card/card.component';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CardComponent, LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [CardComponent, LoadingSpinnerComponent],
})
export class SharedModule {}
