import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";
import { MatSortModule } from "@angular/material/sort";
import { PageLoaderModule } from "src/app/shared/loader/page-loader/page-loader.module";
import { MatMenuModule } from "@angular/material/menu";
import { SmartKeySystemComponent } from "./smart-key-system.component";
import { NgDialogAnimationService } from "ng-dialog-animation";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { MatDialogModule } from "@angular/material/dialog";
import { DeleteConfirmationModalModule } from "src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module";

const routes:Routes = [{path: '', component: SmartKeySystemComponent}]

@NgModule({
    declarations: [SmartKeySystemComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatMenuModule,
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

export class SmartKeySystemConfigModule{}