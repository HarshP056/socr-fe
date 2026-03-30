import { NgModule } from "@angular/core";
import { DocIdRangeComponent } from "./doc-id-range.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { PageLoaderModule } from "src/app/shared/loader/page-loader/page-loader.module";
import { NgDialogAnimationService } from "ng-dialog-animation";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { CreateDocidRangeComponent } from './components/create-docid-range/create-docid-range.component';
import { DeleteConfirmationModalModule } from "src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module";

const routes: Routes = [
    {path: '', component: DocIdRangeComponent}
]
@NgModule({
    declarations: [DocIdRangeComponent, CreateDocidRangeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        FormsModule,
        PageLoaderModule,
        DeleteConfirmationModalModule
    ],
    providers: [
        NgDialogAnimationService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        BsModalService,
    ],
})

export class DocIdRangeModule{}