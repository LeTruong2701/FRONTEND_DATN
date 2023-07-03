import { BaseComponent } from './../../core/common/base-component';
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';

import {  ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';

import { ChartDataset } from 'chart.js';
import { Revenue } from 'src/app/entities/revenue.interface';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as chartjsPluginDatalabels from 'chartjs-plugin-datalabels';
import { ApiService } from 'src/app/core/service/api.service';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent extends BaseComponent implements OnInit,AfterViewInit {

  
  
  constructor(injector: Injector) { 
    super(injector);
    
  }
 
  public tableData:any[]=[];
  public fromDate:string="";
  public toDate:string="";
  public sodon:any;
  public loinhuan:any;
  public danhsachspbantrongthang:any;
  ngOnInit():void {
    this.loadRevenues();
    
    
    // Chart.register(ChartAnnotation);
    this._api.get('/api/ThongKe/get-sodonhang-theo-thang').subscribe(res => {
      this.sodon = res;
      console.log(res);
    }); 

    this._api.get('/api/ThongKe/get-loinhuan-theo-thang').subscribe(res => {
      this.loinhuan = res;
      console.log(res);
    }); 

    this._api.get('/api/ThongKe/get-danhsachsanpham-voisoluongban-trongthang').subscribe(res => {
      this.danhsachspbantrongthang = res;
      console.log(res);
    }); 



    this.loadScripts('./assets/plugins/common/common.min.js','./assets/js/custom.min.js','./assets/js/settings.js','./assets/js/gleek.js','./assets/js/styleSwitcher.js'
    ,'./assets/plugins/chartist/js/chartist.min.js');
    //thả hàm xuống đây
    // ,'./assets/plugins/chartist-plugin-tooltips/js/chartist-plugin-tooltip.min.js','./assets/js/plugins-init/chartist.init.js'
  }

  ngAfterViewInit() {
    
  }

  // public lineChartData:ChartDataset[]=[
  //   {data:[65,59,80],label:'accbcb'},
  //   {data:[28,48,40],label:'ccc'},
  //   {data:[18,48,77],label:'zzzz'},
  // ];

  //

  refeshChart(){
    setTimeout(()=>{
      if(this.chart&&this.chart.chart&&this.chart.chart.config){
        this.chart.chart.config.data.datasets=this.lineChartData.datasets;
    
        this.chart.chart.update();
      }
    }, 0);
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Lợi nhuận',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Doanh thu',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      
    ],
    labels: []
  };
  public labels: string[] = [];

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              position: 'center',
             
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  loadRevenues() {
    this._api.get('/api/ThongKe/get-doanhthuloinhuan?fromDate=' + this.fromDate + '&toDate=' + this.toDate)
  .subscribe((response: Revenue[]) => {
    // Xóa dữ liệu cũ của biểu đồ
    this.lineChartData.datasets[0].data = [];
    this.lineChartData.datasets[1].data = [];
    this.lineChartData.labels = [];

    for (const item of response) {
      // Thêm giá trị Lợi nhuận vào dataset 'Lợi nhuận'
      this.lineChartData.datasets[0].data.push(item.loiNhuan);

      // Thêm giá trị Doanh thu vào dataset 'Doanh thu'
      this.lineChartData.datasets[1].data.push(item.doanhThu);

      // Thêm nhãn thời gian cho biểu đồ
      this.lineChartData.labels.push(this.formatDate1(item.date));
    }

    this.tableData = response;
    console.log(this.tableData);
    this.refeshChart();
  });
  }


   formatDate1(date:any) {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
  
    return [month, day, year].join('/');
  }





  ///Đây là pie chart
  @ViewChild('chartPie') chartPie?: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      // datalabels: {
      //   formatter: (value, ctx) => {
      //     if (ctx.chart.data.labels) {
      //       return ctx.chart.data.labels[ctx.dataIndex];
      //     }
      //   },
      // },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Giao hàng thành công', 'Chưa giao', 'Đã hủy' ],
    datasets: [ {
      data: [],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(255, 99, 132)'
        
      ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  // public pieChartPlugins = [DatalabelsPlugin];
  public pieChartLabels: string[] = ['Giao hàng thành công', 'Đang giao', 'Đã hủy'];
  

  // events
  public chartClicked1({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered1({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public sodondathongke:any;
  loadSoDon(){
    this._api.get('/api/ThongKe/get-thongkesodon?fromDate=' + this.fromDate + '&toDate=' + this.toDate).subscribe(res => {
      this.sodondathongke = res;
      console.log(res);
       // Xóa dữ liệu cũ của biểu đồ
    this.pieChartData.datasets[0].data = [];
    

      if (this.pieChartData.datasets.length > 0) {
        // Chèn dữ liệu vào mảng data
        this.pieChartData.datasets[0].data.push(this.sodondathongke[0]); // Giao hàng thành công
        this.pieChartData.datasets[0].data.push(this.sodondathongke[1]); // Chưa giao
        this.pieChartData.datasets[0].data.push(this.sodondathongke[2]); // Đã hủy
  
        // Cập nhật biểu đồ
        if (this.chartPie) {
          this.chartPie.update();
        }
      }
      this.refeshChartPie();

    }); 
  }

  refeshChartPie() {
    setTimeout(() => {
      if (this.chartPie && this.chartPie.chart && this.chartPie.chart.config) {
        this.chartPie.chart.data.datasets = this.pieChartData.datasets;
        this.chartPie.chart.update();
      }
    }, 0);
  }
  
  
  

  // <script src="assets/plugins/common/common.min.js"></script>
  //   <script src="assets/js/custom.min.js"></script>
  //   <script src="assets/js/settings.js"></script>
  //   <script src="assets/js/gleek.js"></script>
  //   <script src="assets/js/styleSwitcher.js"></script>
  //   <!-- Chartjs -->
  //   <script src="assets/plugins/chart.js/Chart.bundle.min.js"></script>
  //   <!-- Circle progress -->
  //   <script src="assets/plugins/circle-progress/circle-progress.min.js"></script>
  //   <!-- Datamap -->
  //   <script src="assets/plugins/d3v3/index.js"></script>
  //   <script src="assets/plugins/topojson/topojson.min.js"></script>
  //   <script src="assets/plugins/datamaps/datamaps.world.min.js"></script>
  //   <!-- Morrisjs -->
  //   <script src="assets/plugins/raphael/raphael.min.js"></script>
  //   <script src="assets/plugins/morris/morris.min.js"></script>
  //   <!-- Pignose Calender -->
  //   <script src="assets/plugins/moment/moment.min.js"></script>
  //   <script src="assets/plugins/pg-calendar/js/pignose.calendar.min.js"></script>
  //   <!-- ChartistJS -->
  //   <script src="assets/plugins/chartist/js/chartist.min.js"></script>
  //   <script src="assets/plugins/chartist-plugin-tooltips/js/chartist-plugin-tooltip.min.js"></script>

  //   <script src="assets/js/dashboard/dashboard-1.js"></script>
}
