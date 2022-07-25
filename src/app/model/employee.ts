import { Department } from "./department";
import { Levels } from "./levels";

export class Employee {
    id :number;
    codeEmployee:string;
    nameEmployee:string;
    image:string;
    email:string;
    phone:string;
    address:string;
    ethnic:string;
    gender:number;
    birthday:Date;
    status:number;
    updateDate:Date;
    dep:Department;
    level:Levels;
    

    constructor(id:number,codeEmployee:string, nameEmployee:string,image:string, email:string,
                phone:string,address:string,ethnic:string,gender:number,birthday:Date,
                status:number,updateDate:Date,dep:Department,level:Levels){
        this.id = id;
        this.codeEmployee = codeEmployee;
        this.nameEmployee = nameEmployee;
        this.image = image;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.ethnic = ethnic;
        this.gender = gender;
        this.birthday = birthday;
        this.status = status;
        this.updateDate = updateDate;
        this.dep = dep;
        this.level = level;
       
    }
    

}
