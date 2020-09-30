import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '@app/shared/_modal/modal.module';
import { ConfirmDialogModule } from '@app/shared/components/confirm-dialog/confirm-dialog.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { columnPipe, rowPipe, searchPipe, ReversePipe, searchTabelPipe, DateAgoPipe} from '@app/shared/pipes';

@NgModule({
  declarations: [
    columnPipe,
    rowPipe,
    searchPipe,
    ReversePipe,
    searchTabelPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    ConfirmDialogModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    ModalModule,
    ConfirmDialogModule,
    Ng2SearchPipeModule,
    FormsModule,
    searchPipe,
  ]
})
export class SharedModule {

}
