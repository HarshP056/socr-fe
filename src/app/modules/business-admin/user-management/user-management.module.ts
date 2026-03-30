import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserManagementComponent } from './user-management.component';
import { UserDialogComponent } from './component/user-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
const route: Routes = [{ path: '', component: UserManagementComponent }];

@NgModule({
  declarations: [UserManagementComponent, UserDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    DropdownModule,
    PageLoaderModule,
    KeyFilterModule,
    InputTextModule,
    MultiSelectModule
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class UserManagementModule {}
