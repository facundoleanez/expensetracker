export enum CategoryType {
    Category =  'Category',
    Groceries = 'Groceries',    
    ElectricityBill ='Electricity bill'  ,
    Internet = 'Internet'  ,
    RentAccomodation = 'Rent Accomodation'  ,
    Cellphone = 'Cellphone'  ,
    DeliveryFood = 'Delivery food'  ,
    OnlineShop = 'Online Shop'  ,
    Transport ='Transport',
    Other = 'Other'
}


export interface ExpenseType {
    title : string,
    value: number,
    date? : Date,
    category : CategoryType 
}

