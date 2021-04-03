import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { ConfigurationDialogComponent } from './component/configuration-dialog/configuration-dialog.component';
import { Configuration, DataElement } from './model/interface.model';
import { DataFeedService } from './service/data-feed.service';
import {MatPaginator} from '@angular/material/paginator';
import { HttpRequestService } from './service/http-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  dataElements: Array<DataElement> = [];
  dataSource = new MatTableDataSource<DataElement>();
  configuration: Configuration = new Configuration();

  displayedColumns: string[] = ['no', 'symbol', 'price', 'time'];
  comparisonValue: number;
  isShowingRealTimeData: boolean = true;
  $fetchData: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor( 
    private dataFeedService: DataFeedService,
    private httpRequestService: HttpRequestService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef){ }

  ngOnInit() {    
    this.fetchData();
    this.httpRequestService.getConfiguration().subscribe((data: Configuration) => {
      this.configuration.setValues(data.update_frequency_milliseconds, data.elements_per_update, data.symbols);
    })
  }

  fetchData() {
    this.$fetchData = this.dataFeedService.fetchData().subscribe((data: Array<DataElement>) => {
      this.dataElements = data.concat(this.dataElements);
      if (this.dataElements.length > 500) {
        // always show last 500
        this.dataElements = this.dataElements.slice(0, 500);
      }
      this.refreshDataSource();
    });
  }

  updateConfig(config: Configuration) {
    this.dataFeedService.stopFetchingData();
    this.dataFeedService.updateConfig(config);
    this.dataFeedService.startFetchingData();
  }

  openUpdateConfigDialog(): void {
    const dialogRef = this.dialog.open(ConfigurationDialogComponent, {
      minWidth: '40%',
      maxWidth: '50%',      
      minHeight: '30%',
      maxHeight: '50%',
      data: {
        config: this.configuration
      }
    });

    dialogRef.afterClosed().subscribe((result: Configuration) => {
      if (result) {
        this.configuration.setValues(result.update_frequency_milliseconds, result.elements_per_update);
        console.log("new config", this.configuration);
        this.updateConfig(result);
      }
    });
  }

  toggleDataDisplay() {    
    if (this.isShowingRealTimeData) {
      if (this.$fetchData) {
        this.$fetchData.unsubscribe();
      }
      this.dataElements = this.dataFeedService.getHistoryFromCache();
      this.refreshDataSource();
    } else {
      this.dataElements = this.dataFeedService.getHistoryFromCache();
      this.refreshDataSource();
      this.fetchData();
    }
    this.isShowingRealTimeData = !this.isShowingRealTimeData;
  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource<DataElement>(this.dataElements);
    this.dataSource.paginator = this.paginator;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.$fetchData) {
      this.$fetchData.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
