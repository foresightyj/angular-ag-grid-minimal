import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';

import { nameof } from "ts-simple-nameof";
import { IUser } from "../../../types";

@Component({
  selector: 'app-hello-infinite-row',
  templateUrl: './hello-infinite-row.component.html',
  styleUrls: ['./hello-infinite-row.component.css']
})
export class HelloInfiniteRowComponent implements OnInit {

  public columnDefs: ColDef[] = [
    {
      headerName: 'Id',
      field: nameof<IUser>(m => m.id),
    },
    {
      headerName: 'Name',
      maxWidth: 100,
      field: nameof<IUser>(m => m.name),
    },
    {
      headerName: 'Gender',
      field: nameof<IUser>(m => m.gender),
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    minWidth: 100,
  };
  public rowBuffer = 0;
  public rowSelection = 'multiple';
  public rowModelType = 'infinite';
  //see https://www.ag-grid.com/angular-data-grid/infinite-scrolling/#block-size
  public cacheBlockSize = 20;
  public cacheOverflowSize = 2;
  public maxConcurrentDatasourceRequests = 1;
  public infiniteInitialRowCount = 1000;
  //see https://www.ag-grid.com/angular-data-grid/infinite-scrolling/#block-cache
  public maxBlocksInCache = 10;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {

    const dataSource: IDatasource = {
      rowCount: undefined,
      getRows: (params: IGetRowsParams) => {
        const { startRow, endRow } = params;
        console.log('asking for ' + startRow + ' to ' + endRow);
        //to construct a meaningful lawRow parameter for params.successCallback
        //we are going to request 1 more than needed to see if reached the last page.
        const url = `http://localhost:3000/users?_start=${startRow}&_end=${endRow + 1}`;
        this.http.get<IUser[]>(url).subscribe((data) => {
          //see https://www.ag-grid.com/angular-data-grid/infinite-scrolling/#setting-last-row-index
          const lastRow = (endRow+1-startRow === data.length)? undefined: startRow + data.length;
          data.pop();
          params.successCallback(data, lastRow);
        });
      },
    };
    params.api!.setDatasource(dataSource);
  }
}
