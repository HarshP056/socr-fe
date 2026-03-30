import { NgModule } from "@angular/core";
import { LogicalSystemsComponent } from "./logical-systems.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";
import { MatSortModule } from "@angular/material/sort";
import { PageLoaderModule } from "src/app/shared/loader/page-loader/page-loader.module";
import { MatMenuModule } from "@angular/material/menu";
import { CreateLogicalSystemComponent } from './component/create-logical-system/create-logical-system.component';
import { NgDialogAnimationService } from "ng-dialog-animation";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DeleteConfirmationModalModule } from "src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module";
import { DropdownModule } from "primeng/dropdown";

const routes:Routes = [{path: '', component: LogicalSystemsComponent}]

@NgModule({
    declarations: [LogicalSystemsComponent, CreateLogicalSystemComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        FormsModule,
        PageLoaderModule,
        DeleteConfirmationModalModule,
        DropdownModule,
    ],
    providers: [
        NgDialogAnimationService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        BsModalService,
    ],
})

export class LogicalSystemModule{}
