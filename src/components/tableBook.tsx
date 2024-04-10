import React, { useState } from 'react';
import {updateBooking } from '../services/apiService.ts';
import { createTableData } from '../common/common.ts';
import { PrefixTableNames } from '../models/globalNames.ts'; 
import tableValidation from '../services/validationService.ts'
const TableBook: React.FC = ({ tableDataBook, setTableDataBook, updateTableDataUser }) => {
    const [errorBookTable, setErrorBookTable] = useState<string | null>(null);
    
    const QuantityOnChangeBook = async (quantity:number,id: number, quantityForChange: number) => {
        if(tableValidation.IsQuantityForChangeValid(quantityForChange,quantity)){
          const updatedTableData = tableDataBook.map((item) =>
            item.id === id ? { ...item, quantityForChange } : item
          );
          setTableDataBook(updatedTableData)
        }else{
          setErrorBookTable('אין אפשרות להזמין את הכמות הזאת');
        }
      };
    
    

      const BookChangeBook = async (quantity: number, quantityForChange: number, key: string) => {
        try {
            if(tableValidation.IsQuantityForChangeValid(quantityForChange,quantity)){
            const response = await updateBooking(key, quantityForChange);
            if (response.data.code !== 200) {
              setErrorBookTable(response.data.msg);
            } else {
              setErrorBookTable(null);
            }
            setTableDataBook(createTableData(response,PrefixTableNames.BOOK));
            updateTableDataUser(createTableData(response, PrefixTableNames.USER));
          }else{
            setErrorBookTable('אין אפשרות להזמין את הכמות הזאת');
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };


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