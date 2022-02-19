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
  public cacheBlockSize = 100;
  public cacheOverflowSize = 2;
  public maxConcurrentDatasourceRequests = 1;
  public infiniteInitialRowCount = 1000;
  public maxBlocksInCache = 10;
  public rowData!: any[];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('http://localhost:3000/users')
      .subscribe((data) => {
        const dataSource: IDatasource = {
          rowCount: undefined,
          getRows: function (params: IGetRowsParams) {
            console.log(
              'asking for ' + params.startRow + ' to ' + params.endRow
            );
            // At this point in your code, you would call the server.
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
              // take a slice of the total rows
              const rowsThisPage = data.slice(params.startRow, params.endRow);
              // if on or after the last page, work out the last row.
              let lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              // call the success callback
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api!.setDatasource(dataSource);
      });
  }
}
