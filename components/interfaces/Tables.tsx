export default interface TableNames {
    name: 'HatModels' | 'Materials' | 'Suppliers' | 'Customers';
}

export interface HatModels{
    ID: number;
    Name: string;
    Style: string;
    MaterialID: number;
    RetailPrice: number;
}
export interface Materials{
    ID: number;
    Name: string;
    SupplierID: number;
}
export interface Suppliers{
    ID: number;
    CompanyName: string;
    ContactName: string;
    Phone: string;
}
export interface Customers{
    ID: number;
    Name: string;
    Surname: string;
    Address: string;
    Phone: string;
}
