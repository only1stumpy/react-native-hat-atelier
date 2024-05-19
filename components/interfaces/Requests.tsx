export default interface Requests {

    searchModel(modelName:string,setModel:any):any;

    searchPriceBetween(min:number, max:number,setModel:any):void;

    searchMaterial(materialName:string,setMaterial:any):void;

    searchSupplier(supplierName:string,setSupplier:any):void;
}