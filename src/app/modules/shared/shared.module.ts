import { NgModule } from '@angular/core';

import { CardComponent } from '../../components/shared/card/card.component';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [CardComponent, LoadingSpinnerComponent],
  imports: [],
  exports: [CardComponent, LoadingSpinnerComponent],
})
export class SharedModule {}
