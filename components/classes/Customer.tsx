import { type SQLiteDatabase } from 'expo-sqlite';
import {Customers} from '../interfaces/Tables';
import DataBase from './DataBase';


export default class Customer extends DataBase{
    constructor(db:SQLiteDatabase){ 
        super();// аналог base
        this.db = db;
    }
    async update(item:Customers,nameUpdate:string,surnameUpdate:string,addressUpdate:string,phoneUpdate:string) {
      // Создаем обновленный объект, используя значения из item и новые значения, если они предоставлены
      let itemUpdate: Customers = {
        ID: item.ID,
        Name: nameUpdate || item.Name,
        Surname: surnameUpdate || item.Surname,
        Address: addressUpdate || item.Address,
        Phone: phoneUpdate || item.Phone
      };
      // Обновляем запись в базе данных
      await this.db.runAsync(
        'UPDATE Customers SET Name = ?, Surname = ?, Address = ?, Phone = ? WHERE ID = ?',
        [itemUpdate.Name, item.Surname,item.Address,itemUpdate.Phone, itemUpdate.ID]
      );
    }
    async create () {
        await this.db.runAsync(`CREATE TABLE IF NOT EXISTS Customers (
          ID INTEGER PRIMARY KEY AUTOINCREMENT, 
          Name VARCHAR(255), 
          Surname VARCHAR(255), 
          Address VARCHAR(255), 
          Phone VARCHAR(255))`);
    }
    async get (customers,setCustomers) {
        const res = await this.db.getAllAsync<Customers>(`SELECT * FROM Customers ORDER BY ID`);
        let len = res.length;
          if (len > 0) {
            this.orderDB(res,'Customers');
            setCustomers(res);
        }
    }
    async isEmpty(){
      const res = await this.db.getAllAsync<Customers>(`SELECT * FROM Customers ORDER BY ID`);
      return (res.length === 0)? true : false;
    }
    async delete(id: number, tableName: string, customers?: Customers[], setCustomers?: any) {
        super.delete(id, 'Customers');
        if (customers && setCustomers) {
            this.get(customers, setCustomers);
        }
    }
    
    async add(name: string,setName: any,surname: string,setSurname:any,address: string,setAddress:any,phone: string,setPhone:any,customers: Customers[],setCustomers: any,setDialogVisible:any) {
        if (!name || !surname ||!address || !phone ) {
          alert("Enter all inputs");
          return false;
        }
        await this.db.runAsync(
          `INSERT INTO Customers (Name, Surname, Address, Phone) VALUES (?, ?, ?, ?)`,
          [name,surname,address,phone]
        );
        this.get(customers,setCustomers);
        setName("");
        setSurname("");
        setAddress("");
        setPhone("");
        setDialogVisible(false);
      };
  }