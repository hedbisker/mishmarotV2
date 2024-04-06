import React, { useState } from 'react';
import axios,{AxiosResponse} from 'axios';

interface TableData {
    id: number;
    name: string;
    key:string;
    quantity: number;
    quantityForChange:number
  }

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [tableDataBook, setTableDataBook] = useState<TableData[]>([]);
  const [tableDataUser, setTableDataUser] = useState<TableData[]>([]);

  const QuantityOnChangeUser = async (quantity:number,id: number, quantityForChange: number) => {
    if (quantityForChange < 1 || quantityForChange > quantity) {
        setError('אין אפשרות להזמין את הכמות הזאת');
        return;
      }
    const updatedTableData = tableDataUser.map((item) =>
      item.id === id ? { ...item, quantityForChange } : item
    );
    setTableDataUser(updatedTableData)
  };

  const QuantityOnChangeBook = async (quantity:number,id: number, quantityForChange: number) => {
    if (quantityForChange < 1 || quantityForChange > quantity) {
        setError('אין אפשרות להזמין את הכמות הזאת');
        return;
      }
    const updatedTableData = tableDataBook.map((item) =>
      item.id === id ? { ...item, quantityForChange } : item
    );
    setTableDataBook(updatedTableData)

  };

  const GetCarName = (sName: string) =>
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


    const BookChange = async (quantity:number,quantityForChange:number,key:string) => {
        if (quantityForChange < 1 || quantityForChange > quantity) {
          setError('אין אפשרות להזמין את הכמות הזאת');
          return;
        }
        
        const response = await axios.post('http://localhost:12403/updateBooking.asp',"updateBooking,"+key + "," + quantityForChange);
        
        console.log(response.data);

        if(response.data.code != 200){
            setError(response.data.message);
            return;
        }
       
        TableSetter(response);
    }


    const TableSetter = (response: AxiosResponse<any,any>) => {
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
          setTableDataBook(bookTableTata);


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

  
    const _Login = async () => {
    try {
        if(/^[a-zA-Z0-9א-ת]+$/.test(username) == false){
            setError('username msut contain only alphabet or numbers');
            return;
        }

        const response = await axios.post('http://localhost:12403/login.asp',"login,"+username);

        if(response.data.code != 200){
            setError(response.data.message);
            return;
        }
        TableSetter(response);
        setLoggedIn(true);
    } catch (error) {
        console.log(error);
    } finally {

    }
  };


  const Logout = async () => {
    try {
       
        const response = await axios.post('http://localhost:12403/logout.asp',"logout");
        
        if(response.data.code != 200){
            setError(response.data.message);
            return;
        }
        setLoggedIn(false);
    } catch (error) {
        console.log(error);
    } finally {

    }
  };

  return (
    <div>
    {loggedIn ? 
    (
    <div>
        <label>{username} : שלום</label><br></br>
        <button onClick={Logout}>התנתק</button>
        <br></br><br></br>

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
                    <button onClick={() => BookChange(item.quantity,item.quantityForChange, item.key)}>
                    רכבים להזמנה
                    </button></td>
              </tr>
                ))}
            </tbody>
          </table>

          <br></br>
          <br></br>
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
                    <button onClick={() => BookChange(item.quantity,item.quantityForChange, item.key)}>
                    רכבים להחזרה
                    </button></td>
              </tr>
                ))}
            </tbody>
          </table>
    </div>
    

    ):
    (<div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={_Login}>Login</button>
    </div>)}
    <label>{error && <p style={{ color: 'red' }}>Error: {error}</p>}</label>
    </div>
  );
};

export default Login;