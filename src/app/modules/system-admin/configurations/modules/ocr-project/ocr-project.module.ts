import { NgModule } from '@angular/core';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { RouterModule, Routes } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { OcrProjectComponent } from './ocr-project.component';
import { PageLoaderModule } from "../../../../../shared/loader/page-loader/page-loader.module";
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddDerivationComponent } from './components/add-derivation/add-derivation.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { CommonModule } from '@angular/common';
import { CreateOcrProjectComponent } from './components/create-ocr-project/create-ocr-project.component';
import { CreateRulesComponent } from './components/create-rules/create-rules.component';
import { MONACO_PATH, MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { FieldOptionsComponent } from './components/field-options/field-options.component';
import { CustomFieldsDialogComponent } from './components/custom-fields/custom-fields.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CopyOcrProjectComponent } from './components/copy-ocr-project/copy-ocr-project.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
  { path: '', component: OcrProjectComponent },
  { path: 'create', component: CreateOcrProjectComponent },
  { path: 'edit/:id', component: CreateOcrProjectComponent },
  { path: 'copy/:id', component: CopyOcrProjectComponent },
];
@NgModule({
    declarations: [OcrProjectComponent, AddDerivationComponent, CreateOcrProjectComponent, CreateRulesComponent, FieldOptionsComponent, CustomFieldsDialogComponent, CopyOcrProjectComponent],
    providers: [
      BsModalService,
      {
        provide: MONACO_PATH,
        useValue: 'https://unpkg.com/monaco-editor@0.36.1/min/vs',
      }
    ],
    imports: [
        DeleteConfirmationModalModule,
        PageLoaderModule,
        MaterialModule,
        FormsModule,
        DropdownModule,
        DragDropModule,
        RouterModule.forChild(routes),
        MaterialModule,
        MultiSelectModule,
        PipeModule,
        CommonModule,
        MonacoEditorModule,
        SharedModule,
        ClipboardModule,
        TypeaheadModule,
        MatSlideToggleModule
    ]
})
export class OcrProjectModule {}
