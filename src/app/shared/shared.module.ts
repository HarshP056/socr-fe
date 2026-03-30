import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumbersOnlyDirective } from './directive/number-only.directive';

@NgModule({
    declarations: [
        NumbersOnlyDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NumbersOnlyDirective
    ]
})
export class SharedModule {}
