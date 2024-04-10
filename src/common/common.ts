import { AxiosResponse } from 'axios';
import TableData from '../models/TableData';

export const GetCarName = (sName: string) =>
{
    switch (sName) {
        case "MAZDA_FOR_BOOK":
        case "MAZDA_FOR_USER":
          return "מאזדה";
        case "KIA_FOR_BOOK":
        case "KIA_FOR_USER":
          return "קיה";
        case "SHEV_FOR_BOOK":
        case "SHEV_FOR_USER":
          return "שברולט";
        default:
          return "דייהטסו";
      }
 }
 
 export const createTableData = (response: AxiosResponse<any,any>, prefix: string): TableData[] => {
    const tableData: TableData[] = [
      { id: 0, name: GetCarName(`MAZDA_FOR_${prefix}`), key: `MAZDA_FOR_${prefix}`, quantity: response.data[`MAZDA_FOR_${prefix}`], quantityForChange: 1 },
      { id: 1, name: GetCarName(`KIA_FOR_${prefix}`), key: `KIA_FOR_${prefix}`, quantity: response.data[`KIA_FOR_${prefix}`], quantityForChange: 1 },
      { id: 2, name: GetCarName(`SHEV_FOR_${prefix}`), key: `SHEV_FOR_${prefix}`, quantity: response.data[`SHEV_FOR_${prefix}`], quantityForChange: 1 },
      { id: 3, name: GetCarName(`DAIH_FOR_${prefix}`), key: `DAIH_FOR_${prefix}`, quantity: response.data[`DAIH_FOR_${prefix}`], quantityForChange: 1 },
    ];
    return tableData;
  };

  
 