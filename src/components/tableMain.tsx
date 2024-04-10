import React, { useState,useEffect } from 'react';
import TableUser from './tableUser.tsx';
import TableBook from './tableBook.tsx';
import  TableData  from '../models/TableData.ts'
import { createTableData } from '../common/common.ts';
import { readCars } from '../services/apiService.ts';
import { PrefixTableNames } from '../models/globalNames.ts';

const TableMain: React.FC = () => {
    const [tableDataUser, setTableDataUser] = useState<TableData[]>([]);
    const [tableDataBook, setTableDataBook] = useState<TableData[]>([]);
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    
    useEffect(() => 
    {
        if (constructorHasRun) return;
            readCars().then(
             res=>{
                setTableDataBook(createTableData(res,PrefixTableNames.BOOK));
                setTableDataUser(createTableData(res,PrefixTableNames.USER));
            })
            setConstructorHasRun(true);
    });

    const updateTableDataUser = (updatedData: TableData[]) => {
        setTableDataUser(updatedData);
      };
    
      const updateTableDataBook = (updatedData: TableData[]) => {
        setTableDataBook(updatedData);
      };

    return (
        <div>
          <TableBook tableDataBook={tableDataBook} setTableDataBook={setTableDataBook} updateTableDataUser={updateTableDataUser}/>
          <TableUser tableDataUser={tableDataUser} setTableDataUser={setTableDataUser} updateTableDataBook={updateTableDataBook}  />
        </div>
        );
};

export default TableMain;