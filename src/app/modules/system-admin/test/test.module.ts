import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';


const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
];

@NgModule({
    declarations: [TestComponent],
    exports: [RouterModule],
    imports: [CommonModule, RouterModule.forChild(routes), PipeModule,PageLoaderModule]
})
export class TestModule { }
