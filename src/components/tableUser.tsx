import React, { useState } from 'react';
import {updateBooking  } from '../services/apiService.ts';
import { createTableData } from '../common/common.ts';
import { PrefixTableNames } from '../models/globalNames.ts';
import tableValidation from '../services/validationService.ts'


const TableUser: React.FC = ({tableDataUser,setTableDataUser, updateTableDataBook}) => {
    const [errorUserTable, setErrorUserTable] = useState<string | null>(null);
        const QuantityOnChangeUser = async (quantity:number,id: number, quantityForChange: number) => {
          if(tableValidation.IsQuantityForChangeValid(quantityForChange,quantity)){
            const updatedTableData = tableDataUser.map((item) =>
              item.id === id ? { ...item, quantityForChange } : item
            );
            setTableDataUser(updatedTableData)
          }else{
            setErrorUserTable('אין אפשרות להזמין את הכמות הזאת');
          }
      };
    
    
      const BookChangeUser = async (quantity: number, quantityForChange: number, key: string) => {
        try {
          if(tableValidation.IsQuantityForChangeValid(quantityForChange,quantity)){
          const response = await updateBooking(key, quantityForChange);
          if (response.data.code !== 200) {
            setErrorUserTable(response.data.msg);
          } else {
            setErrorUserTable(null);
          }
          setTableDataUser(createTableData(response, PrefixTableNames.USER));
          updateTableDataBook(createTableData(response,PrefixTableNames.BOOK));
        }else
        {
          setErrorUserTable('אין אפשרות להזמין את הכמות הזאת');
        }
        } catch (error) {
          console.error("Error:", error);
        }
      };



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