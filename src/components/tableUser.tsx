import React, { useState } from 'react';
import {updateBooking  } from '../services/apiService.ts';
import { createUserTable, createBookTable } from '../common/common.ts';
import  TableData  from '../models/TableData.ts'


const TableUser: React.FC = ({tableDataUser,setTableDataUser, updateTableDataBook}) => {
    const [errorUserTable, setErrorUserTable] = useState<string | null>(null);


        const updateDataInParent = (updatedData: TableData[]) => {
            updateTableDataBook(updatedData);
          };


        const QuantityOnChangeUser = async (quantity:number,id: number, quantityForChange: number) => {

        if (quantityForChange < 1 || quantityForChange > quantity) {
            setErrorUserTable('אין אפשרות להזמין את הכמות הזאת');
            return;
          }
       
          console.log("quantityForChange=" + quantityForChange + " , quantity=" + quantity);
        const updatedTableData = tableDataUser.map((item) =>
          item.id === id ? { ... item, quantityForChange } : item
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
           
            setTableDataUser(createBookTable(response));
            updateDataInParent(createUserTable(response));

            return {code:200,"msg":''} 
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