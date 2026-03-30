import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [{ path: '', component: RolesComponent }];

@NgModule({
  declarations: [RolesComponent],
  imports: [CommonModule, RouterModule.forChild(route)],
})
export class RolesModule {}
