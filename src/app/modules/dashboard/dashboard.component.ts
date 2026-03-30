import { Component, OnInit, ViewChild } from '@angular/core';
import { ChannelService, DashboardService, OcrConfigService, OcrProjectService, SocrOcrService, StorageService } from 'src/app/services';
import moment from 'moment';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  dashboardCount: any
  stageCount: any;
  searchQueryParams: any = {
    docId: '',
    fileName: '',
    limit: 10,
    order: '-createdDate',
    page: 1,
    projectId: '',
    fromDate: '',
    toDate: ''
  };
  queyList: any = {
    page: 1,
    limit: 50,
    order: "projectNameOrGuid"
  };
  user: any;
  project: any[] = [];
  channels: any[] = [];
  ocrProject: any;
  profileId: string = "";
  channelId: string = "";
  invoiceFilter: string = "Week";
  options: any[] = ['Week', 'Month', 'Year', 'Custom'];
  dateRange: any[] = [];
  fromDate: string = "";
  toDate: string = "";
  maxDate = new Date();

  constructor(
    private dashboardService: DashboardService,
    private socrOcrService: SocrOcrService,
    private ocrProjectService : OcrProjectService,
    private storageService: StorageService,
    private channelService: ChannelService,
    private ocrConfigService: OcrConfigService
  ) {
  }

  getDashBoardCount() {
    this.dashboardService.getDashboardCount({ocrProject: this.profileId ? this.profileId : "", channel: this.channelId ? this.channelId : ""}).subscribe({
      next: (value: any) => {
        if(value) {
          this.dashboardCount = value;
        } else {
          this.dashboardCount = {
            totalConsumedPagesCount: 0,
            totalInvoiceCount: 0,
            totalLicensePagesCount: 0,
            totalRemainingPagesCount: 0
          }
        }
      }, error: (err: any) => {
        console.log(err);
      },
    })
  }

  getInvoiceDataForGraph(filter: string) {
    if(filter !== "Custom") {
      let query = {
        dateRange: filter,
        dateFrom: "",
        dateTo: ""
      };
      this.getExceptionVsProcessedInvoices(query)
    }
  }

  getExceptionVsProcessedInvoices(query: any) {
    this.dashboardService.getProcessAndExceptionInvoicesCountForGraph(query).subscribe({
      next: (value: any) => {
        if(value) {
          let res = value;
          let labels: any[] = [];
          let processedData: any[] = [];

          if (query.dateRange == "Week") {
            labels = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
            processedData = [
              res["MONDAY"]["processedInvoiceCount"],
              res["TUESDAY"]["processedInvoiceCount"],
              res["WEDNESDAY"]["processedInvoiceCount"],
              res["THURSDAY"]["processedInvoiceCount"],
              res["FRIDAY"]["processedInvoiceCount"],
              res["SATURDAY"]["processedInvoiceCount"],
              res["SUNDAY"]["processedInvoiceCount"]
            ];
          } else if (query.dateRange == "Month") {
            labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
            processedData = [
              res["Week 1"]["processedInvoiceCount"],
              res["Week 2"]["processedInvoiceCount"],
              res["Week 3"]["processedInvoiceCount"],
              res["Week 4"]["processedInvoiceCount"],
              res["Week 5"]["processedInvoiceCount"]
            ];
          } else if (query.dateRange == "Year") {
            labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            processedData = [
              res["JANUARY"]["processedInvoiceCount"],
              res["FEBRUARY"]["processedInvoiceCount"],
              res["MARCH"]["processedInvoiceCount"],
              res["APRIL"]["processedInvoiceCount"],
              res["MAY"]["processedInvoiceCount"],
              res["JUNE"]["processedInvoiceCount"],
              res["JULY"]["processedInvoiceCount"],
              res["AUGUST"]["processedInvoiceCount"],
              res["SEPTEMBER"]["processedInvoiceCount"],
              res["OCTOBER"]["processedInvoiceCount"],
              res["NOVEMBER"]["processedInvoiceCount"],
              res["DECEMBER"]["processedInvoiceCount"]
            ];
          } else if (query.dateRange == "Custom") {
            let startDate = moment(query.dateFrom).format("MM/DD/YYYY");
            let endDate = moment(query.dateTo).format("MM/DD/YYYY");
            labels = [startDate + " - " + endDate];
            processedData = [
              res["Custom Range"]["processedInvoiceCount"]
            ];
          }

          this.chartOptions = {
            series: [
              {
                name: "Processed Invoces",
                data: processedData
              }
            ],
            chart: {
              type: "bar",
              height: 390
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "50%",
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"]
            },
            xaxis: {
              categories: labels
            },
            yaxis: {
              title: {
                text: ""
              }
            },
            fill: {
              opacity: 1,
              colors: ['#2E93fA']
            },
            tooltip: {
              // y: {
              //   formatter: function(val) {
              //     return "$ " + val + " thousands";
              //   }
              // }
            },
          };
        }
      }, error: (err: any) => {
      },
    })
  }

  getProjects() {
    this.ocrProjectService.getOcrProjectsPage(this.queyList).subscribe({
      next: (res: any) => {
        if ((this.user.role === 'CompanyUser' || this.user?.role === 'VerificationUser') && this.user.ocrProject.length) {
          this.user.ocrProject.forEach((item:any)=>{
            res.content.forEach((elem:any)=>{
              if(elem.projectNameOrGuid ===item){
                this.project.push(elem)
              }
            });
          })
        }
        else {
          this.project = res['content'];
        }
      },
      error: (err: any) => {
      },
    });
  }

  getStageCount() {
    const countQueryParams: any = {};
    if (this.searchQueryParams.projectId) countQueryParams.projectId = this.searchQueryParams.projectId;
    this.socrOcrService.getStageCount(countQueryParams).subscribe((response: any) => {
      this.stageCount = response;
    });
  }

  private getAllChannels() {
    this.channelService.getCannelByPage({ limit: 50, order: '-usernameId', page: 1}).subscribe({
      next: (res: any) => {
        this.channels = res['content'];

        if ((this.user.role === 'CompanyUser' || this.user.role === 'VerificationUser') && this.user.channel.length) {
          this.user.channel.forEach((item:any)=>{
            res.content.forEach((elem:any)=>{
              if(elem.usernameId ===item){
                this.channels.push(elem)
              }
            })
          })
        }
        else{
          this.channels = res.content;
        }
        
      },
      error: (err: any) => {
      },
    });
  }

  private getAllOcrProfile() {
    this.ocrProjectService.getOcrProjectsPage({ limit: 50, order: '-id', page: 1}).subscribe({
      next: (res: any) => {
        this.ocrProject = res['content'];
      },
      error: (err: any) => {
      },
    });
  }

  onDateRangeSelected() {
    if (this.dateRange?.length) {
      this.fromDate = moment.utc(this.dateRange[0]).startOf('day').toISOString();
      this.toDate = moment.utc(this.dateRange[1]).endOf('day').toISOString();
    }
    console.log(this.fromDate, " ", this.toDate)
    let query = {
      dateRange: "Custom",
      dateFrom: this.fromDate,
      dateTo: this.toDate
    };
    this.getExceptionVsProcessedInvoices(query);
  }

  removeDate() {
    this.dateRange = [];
    this.fromDate = '';
    this.toDate = '';
  }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.getProjects();
    this.getStageCount();
    this.getDashBoardCount();
    this.getAllChannels();
    this.getAllOcrProfile();
    let query = {
      dateRange: this.invoiceFilter,
      dateFrom: "",
      dateTo: ""
    };
    this.getExceptionVsProcessedInvoices(query);
  }

}
