import { type SQLiteDatabase } from 'expo-sqlite';
import {HatModels} from '../interfaces/Tables';
import DataBase from './DataBase';

export default class HatModel extends DataBase{
    constructor(db:SQLiteDatabase){ 
        super();// аналог base
        this.db = db;
    }
    async update(item:HatModels,nameUpdate:string,styleUpdate:string,materialIDUpdate:number,retailPriceUpdate:number) {
      // Создаем обновленный объект, используя значения из item и новые значения, если они предоставлены
      let itemUpdate: HatModels = {
        ID: item.ID,
        Name: nameUpdate || item.Name,
        Style: styleUpdate || item.Style,
        MaterialID: materialIDUpdate != null ? materialIDUpdate : item.MaterialID,
        RetailPrice: retailPriceUpdate != null ? retailPriceUpdate : item.RetailPrice
      };
      // Обновляем запись в базе данных
      await this.db.runAsync(
        'UPDATE HatModels SET Name = ?, Style = ?, MaterialID = ?, RetailPrice = ? WHERE ID = ?',
        [itemUpdate.Name, itemUpdate.Style, itemUpdate.MaterialID, itemUpdate.RetailPrice, itemUpdate.ID]
      );
    }
    async create () {
        await this.db.runAsync(`CREATE TABLE IF NOT EXISTS HatModels (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(255),Style VARCHAR(255),MaterialID INT,RetailPrice DECIMAL(10, 2))`);
    }
    async get (models,setModels) {
        const res = await this.db.getAllAsync<HatModels>(`SELECT * FROM HatModels ORDER BY ID`);
        let len = res.length;
          if (len > 0) {
            this.orderDB(res,'HatModels');
            setModels(res);
        }
    }
    async isEmpty(){
      const res = await this.db.getAllAsync<HatModels>(`SELECT * FROM HatModels ORDER BY ID`);
      return (res.length === 0)? true : false;
    }
    async delete(id: number, tableName: string, models?: HatModels[], setModels?: any) {
        super.delete(id, 'HatModels');
        if (models && setModels) {
            this.get(models, setModels);
        }
    }
    
    async add(model: string,setModel: any,style: string,setStyle:any,materialID: string,setMaterialID:any,retailPrice: string,setRetailPrice:any,models: HatModels[],setModels: any,setDialogVisible:any) {
        if (!model || !style || !materialID || !retailPrice) {
          alert("Enter all inputs");
          return false;
        }
        await this.db.runAsync(
          `INSERT INTO HatModels (Name, Style, MaterialID, RetailPrice) VALUES (?, ?, ?, ?)`,
          [model, style, materialID, retailPrice]
        );
        this.get(models,setModels);
        setModel("");
        setStyle("");
        setMaterialID("");
        setRetailPrice("");
        setDialogVisible(false);
      };
}