import React, { useState } from 'react';
import {updateBooking } from '../services/apiService.ts';
import { createUserTable, createBookTable } from '../common/common.ts';
import  TableData  from '../models/TableData.ts'

const TableBook: React.FC = ({ tableDataBook, setTableDataBook, updateTableDataUser }) => {
    const [errorBookTable, setErrorBookTable] = useState<string | null>(null);

    const updateDataInParent = (updatedData: TableData[]) => {
        updateTableDataUser(updatedData);
      };
    
    const QuantityOnChangeBook = async (quantity:number,id: number, quantityForChange: number) => {
        if (quantityForChange < 1 || quantityForChange > quantity) {
            setErrorBookTable('אין אפשרות להזמין את הכמות הזאת');
            return;
          }
        const updatedTableData = tableDataBook.map((item) =>
          item.id === id ? { ...item, quantityForChange } : item
        );
        setTableDataBook(updatedTableData)
    
      };
    
    

        const BookChangeBook = async (quantity:number,quantityForChange:number,key:string) => {
            var response =  await BookChange(quantity,quantityForChange,key);
            if(response.code != 200){
                setErrorBookTable(response.msg);
            }else{
                setErrorBookTable(null);
            }
        }

        

        const  BookChange = async (quantity:number,quantityForChange:number,key:string) => {
            if (quantityForChange < 1 || quantityForChange > quantity) {
                return {code:201,"msg":'אין אפשרות להזמין את הכמות הזאת'}
            }
            
            const response = await updateBooking(key, quantityForChange)
            
            console.log(response.data);
    
            if(response.data.code != 200){
                return {code:response.data.code,"msg":response.data.message}
            }
           
            setTableDataBook(createBookTable(response));
            updateDataInParent(createUserTable(response));
          
            return {code:200,"msg":''} 
        }


    return (
        <div>
    
    <h3>רכבים להזמנה</h3>
             <table border='1'>
                <thead>
                    <tr>
                        <td styles='text-align: center;'>כמה רכבים קיימים</td>
                        <td styles='text-align: center;'>סוג רכב</td>
                        <td styles='text-align: center;'>רכבים להזמנה</td>
                    </tr>
                </thead>
                <tbody>
                    {tableDataBook.map((item)=>(
                  <tr>
                    <td>{item.quantity}</td>
                    <td>{item.name}</td>
                    <td> 
                        <input
                          type="number"
                          value={item.quantityForChange}
                          onChange={(e) => QuantityOnChangeBook(item.quantity,item.id,e.target.value)}
                          />
                        <button onClick={() => BookChangeBook(item.quantity,item.quantityForChange, item.key)}>
                        רכבים להזמנה
                        </button></td>
                  </tr>
                    ))}
                </tbody>
              </table>
                        <label>{errorBookTable && <p style={{ color: 'red' }}>Error: {errorBookTable}</p>}</label>
                         <br></br>
              <br></br>
    </div>
    )

}


export default TableBook