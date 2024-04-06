import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import {updateBooking ,readCars  } from '../services/apiService.ts';
import { GetCarName } from '../common/common.ts';
interface TableData {
    id: number;
    name: string;
    key:string;
    quantity: number;
    quantityForChange:number
  }

const TableUser: React.FC = () => {
    const [tableDataUser, setTableDataUser] = useState<TableData[]>([]);
    const [errorUserTable, setErrorUserTable] = useState<string | null>(null);


    useEffect(() => {
        readCars().then(
            res=>{
                TableSetter(res);
            })
        });

    const QuantityOnChangeUser = async (quantity:number,id: number, quantityForChange: number) => {
        if (quantityForChange < 1 || quantityForChange > quantity) {
            setErrorUserTable('אין אפשרות להזמין את הכמות הזאת');
            return;
          }
        const updatedTableData = tableDataUser.map((item) =>
          item.id === id ? { ...item, quantityForChange } : item
        );
        setTableDataUser(updatedTableData)
      };
    
    
        const BookChangeUser = async (quantity:number,quantityForChange:number,key:string) => {
            var response = await BookChange(quantity,quantityForChange,key);
            if(response.code != 200){
                setErrorUserTable(response.msg);
            }
            else{
                setErrorUserTable(null);
            }
        }
    

        const  BookChange = async (quantity:number,quantityForChange:number,key:string) => {
            if (quantityForChange < 1 || quantityForChange > quantity) {
                return {code:201,"msg":'אין אפשרות להזמין את הכמות הזאת'}
            }
            
            const response = await updateBooking(key, quantityForChange)
    
            if(response.data.code != 200){
                return {code:response.data.code,"msg":response.data.message}
            }
           
            TableSetter(response);
            return {code:200,"msg":''} 
        }


    const TableSetter = (response: AxiosResponse<any,any>) => {

          const userTableTata: TableData[] = [
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
          setTableDataUser(userTableTata);
    }

    return (
        <div>
    <h3>רכבים להחזרה</h3>
    <table border='1'>
      <thead>
          <tr>
              <td styles='text-align: center;'>כמה רכבים הוזמנו</td>
              <td styles='text-align: center;'>סוג רכב</td>
              <td styles='text-align: center;'>רכבים להחזרה</td>
          </tr>
      </thead>
      <tbody>
          {tableDataUser.map((item)=>(
        <tr>
          <td>{item.quantity}</td>
          <td>{item.name}</td>
          <td> 
              <input
                type="number"
                value={item.quantityForChange}
                onChange={(e) => QuantityOnChangeUser(item.quantity,item.id,e.target.value)}
                />
              <button onClick={() => BookChangeUser(item.quantity,item.quantityForChange, item.key)}>
              רכבים להחזרה
              </button></td>
        </tr>
          ))}
      </tbody>
    </table>
    <label>{errorUserTable && <p style={{ color: 'red' }}>Error: {errorUserTable}</p>}</label>

    </div>
    )

}


export default TableUser