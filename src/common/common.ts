import { AxiosResponse } from 'axios';
import TableData from '../models/TableData';

export const GetCarName = (sName: string) =>
{
     if (sName == "MAZDA_FOR_BOOK" || sName == "MAZDA_FOR_USER"){
             return "מאזדה"
     }
     else if(sName == "KIA_FOR_BOOK" || sName == "KIA_FOR_USER"){
             return "קיה"
     }
     else if( sName == "SHEV_FOR_BOOK" || sName == "SHEV_FOR_USER"){
             return "שברולט"
     }
     else  
     {
         return  "דייהטסו"
     }
 }
 
 export const createUserTable = (response: AxiosResponse<any,any>) =>
 {
    const UserTableTata: TableData[] = [
        { id: 0, name: GetCarName('MAZDA_FOR_USER'),
            key: 'MAZDA_FOR_USER', quantity: response.data.MAZDA_FOR_USER,
            quantityForChange:1 },
        { id: 1, name: GetCarName('KIA_FOR_USER'),
            key: 'KIA_FOR_USER', quantity: response.data.KIA_FOR_USER,
            quantityForChange:1 },
        { id: 2, name: GetCarName('SHEV_FOR_USER'),
            key: 'SHEV_FOR_USER', quantity: response.data.SHEV_FOR_USER,
            quantityForChange:1 },
        { id: 3, name: GetCarName('DAIH_FOR_USER'),
            key: 'DAIH_FOR_USER', quantity: response.data.DAIH_FOR_USER,
            quantityForChange:1 },
      ];
      return UserTableTata
  }

 export const createBookTable = (response: AxiosResponse<any,any>) =>
 {
    const bookTableTata: TableData[] = [
        { id: 0, name: GetCarName('MAZDA_FOR_BOOK'),
            key: 'MAZDA_FOR_BOOK', quantity: response.data.MAZDA_FOR_BOOK,
            quantityForChange:1 },
        { id: 1, name: GetCarName('KIA_FOR_BOOK'),
            key: 'KIA_FOR_BOOK', quantity: response.data.KIA_FOR_BOOK,
            quantityForChange:1 },
        { id: 2, name: GetCarName('SHEV_FOR_BOOK'),
            key: 'SHEV_FOR_BOOK', quantity: response.data.SHEV_FOR_BOOK,
            quantityForChange:1 },
        { id: 3, name: GetCarName('DAIH_FOR_BOOK'),
            key: 'DAIH_FOR_BOOK', quantity: response.data.DAIH_FOR_BOOK,
            quantityForChange:1 },
      ];
      return bookTableTata
  }

  
 