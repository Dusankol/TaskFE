import { Position } from "./utils";


export type User={
    id:number;
    firstName:string;
    lastName:string;
    position:Position;
    companyId:number;
    companyName:string;
    dob:Date;
    phoneNumber:string;
}


export type InitialState={
    users:User[];
}