import { type SQLiteDatabase } from 'expo-sqlite';
import {Materials} from '../interfaces/Tables';
import DataBase from './DataBase';


export default class Material extends DataBase{
    constructor(db:SQLiteDatabase){ 
        super();// аналог base
        this.db = db;
    }
    async update(item:Materials,nameUpdate:string,supplierIDUpdate:number) {
      // Создаем обновленный объект, используя значения из item и новые значения, если они предоставлены
      let itemUpdate: Materials = {
        ID: item.ID,
        Name: nameUpdate || item.Name,
        SupplierID: supplierIDUpdate != null ? supplierIDUpdate : item.SupplierID
      };
      // Обновляем запись в базе данных
      await this.db.runAsync(
        'UPDATE Materials SET Name = ?, SupplierID = ? WHERE ID = ?',
        [itemUpdate.Name, itemUpdate.SupplierID, itemUpdate.ID]
      );
    }
    async create () {
        await this.db.runAsync(`CREATE TABLE IF NOT EXISTS Materials (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(255),SupplierID INT)`);
    }
    async get (materials,setMaterials) {
        const res = await this.db.getAllAsync<Materials>(`SELECT * FROM Materials ORDER BY ID`);
        let len = res.length;
          if (len > 0) {
            this.orderDB(res,'Materials');
            setMaterials(res);
        }
    }
    async isEmpty(){
      const res = await this.db.getAllAsync<Materials>(`SELECT * FROM Materials ORDER BY ID`);
      return (res.length === 0)? true : false;
    }
    async delete(id: number, tableName: string, materials?: Materials[], setMaterials?: any) {
        super.delete(id, 'Materials');
        if (materials && setMaterials) {
            this.get(materials, setMaterials);
        }
    }
    
    async add(name: string,setName: any,supplierID: string,setSupplierID:any,materials: Materials[],setMaterials: any,setDialogVisible:any) {
        if (!name || !supplierID ) {
          alert("Enter all inputs");
          return false;
        }
        await this.db.runAsync(
          `INSERT INTO Materials (Name, SupplierID) VALUES (?, ?)`,
          [name,supplierID]
        );
        this.get(materials,setMaterials);
        setName("");
        setSupplierID("");
        setDialogVisible(false);
      };
  }