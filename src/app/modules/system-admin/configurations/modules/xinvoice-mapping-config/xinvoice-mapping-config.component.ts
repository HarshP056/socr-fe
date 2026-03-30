import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageUserService } from 'src/app/services';
import { XInvoiceMappingConfigService } from 'src/app/services/xinvoice-mapping-config.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-xinvoice-mapping-config',
  templateUrl: './xinvoice-mapping-config.component.html',
})
export class XInvoiceMappingConfigComponent implements OnInit, OnDestroy {
  configs: any[] = [];
  initialLoader = false;
  isDelete = false;
  deleteId: string = '';

  displayedColumns = ['name', 'invoiceType', 'headerCount', 'lineCount', 'action'];

  @ViewChild('deleteModal', { static: false })
  deleteModal!: DeleteConfirmationModalComponent;

  constructor(
    private configService: XInvoiceMappingConfigService,
    private router: Router,
    private messageSer: MessageUserService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.initialLoader = true;
    this.loadConfigs();
  }

  ngOnDestroy(): void {
    this.messageSer.appSidebar = true;
  }

  loadConfigs(): void {
    this.configService.findAll().subscribe({
      next: (res: any) => {
        this.configs = res;
        this.initialLoader = false;
      },
      error: () => {
        this.initialLoader = false;
      },
    });
  }

  edit(element: any): void {
    this.router.navigateByUrl(
      '/system-admin/configurations/xinvoice-mapping/edit/' + element.id
    );
  }

  create(): void {
    this.router.navigateByUrl(
      '/system-admin/configurations/xinvoice-mapping/create'
    );
  }

  openConfirmationModal(element: any): void {
    this.deleteId = element.id;
    this.deleteModal.show();
  }

  deleteConfig(): void {
    this.isDelete = true;
    this.configService.delete(this.deleteId).subscribe({
      next: () => {
        this.isDelete = false;
        this.loadConfigs();
        this.deleteModal.hide();
      },
      error: () => {
        this.isDelete = false;
      },
    });
  }
}
