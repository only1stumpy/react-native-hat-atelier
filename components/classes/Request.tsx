import { SQLiteDatabase } from "expo-sqlite";
import Requests from "../interfaces/Requests";
import { HatModels, Materials,Suppliers } from "../interfaces/Tables";
import Toast from 'react-native-toast-message';


export default class Request implements Requests {
    public db: SQLiteDatabase;
    constructor(db: SQLiteDatabase) {
        this.db = db;
    }

    async searchModel(modelName:string,setModel:any){
        const res = await this.db.getAllAsync<HatModels>(`SELECT * FROM HatModels WHERE Name = ?`,modelName);
        let len = res.length;
        if (len > 0) {
            setModel(res);
        }
        else{
            Toast.show({
                type: 'error',
                text1: `Подобный элемент ${modelName} не найден`,
                text2: 'Попробуйте снова',
                position: 'bottom'
              });
        }
    }

    async searchPriceBetween(min:number, max:number,setModel:any){
        const res = await this.db.getAllAsync<HatModels>(`SELECT * FROM HatModels WHERE RetailPrice BETWEEN ? AND ?`,[min,max]);
        let len = res.length;
        if (len > 0) {
            setModel(res);
        }
        else{
            Toast.show({
                type: 'error',
                text1: `Подобный элемент диапозона цен не найден`,
                text2: 'Попробуйте снова',
                position: 'bottom'
              });
        }
    }

    async searchMaterial(materialName:string,setMaterial:any){
        const res = await this.db.getAllAsync<Materials>(`SELECT * FROM Materials WHERE Name = ?`,materialName);
        let len = res.length;
        if (len > 0) {
            setMaterial(res);
        }
        else{
            Toast.show({
                type: 'error',
                text1: `Подобный элемент ${materialName} не найден`,
                text2: 'Попробуйте снова',
                position: 'bottom'
              });
        }
    }

    async searchSupplier(supplierName:string,setSupplier:any){
        const res = await this.db.getAllAsync<Suppliers>(`SELECT * FROM Suppliers WHERE CompanyName = ?`,supplierName);
        let len = res.length;
        if (len > 0) {
            setSupplier(res);
        }
        else{
            Toast.show({
                type: 'error',
                text1: `Подобный элемент ${supplierName} не найден`,
                text2: 'Попробуйте снова',
                position: 'bottom'
              });
        }
    }
}