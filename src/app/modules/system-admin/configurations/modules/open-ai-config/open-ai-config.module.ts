import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenAiConfigComponent } from './open-ai-config.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: OpenAiConfigComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [OpenAiConfigComponent]
})
export class OpenAiConfigModule { }
