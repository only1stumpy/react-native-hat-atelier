import { type SQLiteDatabase } from 'expo-sqlite';
import {Suppliers} from '../interfaces/Tables';
import DataBase from './DataBase';


export default class Supplier extends DataBase{
    constructor(db:SQLiteDatabase){ 
        super();// аналог base
        this.db = db;
    }
    async update(item:Suppliers,companyNameUpdate:string,contactNameUpdate:string,phoneUpdate:string) {
      // Создаем обновленный объект, используя значения из item и новые значения, если они предоставлены
      let itemUpdate: Suppliers = {
        ID: item.ID,
        CompanyName: companyNameUpdate || item.CompanyName,
        ContactName: contactNameUpdate || item.ContactName,
        Phone: phoneUpdate || item.Phone
      };
      // Обновляем запись в базе данных
      await this.db.runAsync(
        'UPDATE Suppliers SET CompanyName = ?, ContactName = ?, Phone = ? WHERE ID = ?',
        [itemUpdate.CompanyName, itemUpdate.ContactName,itemUpdate.Phone, itemUpdate.ID]
      );
    }
    async create () {
        await this.db.runAsync(`CREATE TABLE IF NOT EXISTS Suppliers (
          ID INTEGER PRIMARY KEY AUTOINCREMENT, 
          CompanyName VARCHAR(255), 
          ContactName VARCHAR(255), 
          Phone VARCHAR(255))`);
    }
    async get (suppliers,setSuppliers) {
        const res = await this.db.getAllAsync<Suppliers>(`SELECT * FROM Suppliers ORDER BY ID`);
        let len = res.length;
          if (len > 0) {
            this.orderDB(res,'Suppliers');
            setSuppliers(res);
        }
    }
    async isEmpty(){
      const res = await this.db.getAllAsync<Suppliers>(`SELECT * FROM Suppliers ORDER BY ID`);
      return (res.length === 0)? true : false;
    }
    async delete(id: number, tableName: string, suppliers?: Suppliers[], setSuppliers?: any) {
        super.delete(id, 'Suppliers');
        if (suppliers && setSuppliers) {
            this.get(suppliers, setSuppliers);
        }
    }
    
    async add(companyName: string,setCompanyName: any,contactName: string,setContactName:any,phone: string,setPhone:any,suppliers: Suppliers[],setSuppliers: any,setDialogVisible:any) {
        if (!companyName || !contactName || !phone ) {
          alert("Enter all inputs");
          return false;
        }
        await this.db.runAsync(
          `INSERT INTO Suppliers (CompanyName, ContactName, Phone) VALUES (?, ?, ?)`,
          [companyName,contactName,phone]
        );
        this.get(suppliers,setSuppliers);
        setCompanyName("");
        setContactName("");
        setPhone("");
        setDialogVisible(false);
      };
  }