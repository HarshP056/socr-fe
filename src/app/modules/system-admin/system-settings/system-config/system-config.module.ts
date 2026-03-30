import { NgModule } from "@angular/core";
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
import { DeleteConfirmationModalModule } from "src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module";
import { SystemConfigComponent } from "./system-config.component";
import { SystemConfigDetailsComponent } from './system-config-details/system-config-details.component';

const routes: Routes = [
    {path: '', component: SystemConfigComponent}
]
@NgModule({
    declarations: [SystemConfigComponent, SystemConfigDetailsComponent],
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

export class SystemConfigModule{}