export class Levels {
    id :number;
    name :string;
    basicSalary :any;
    status :boolean;
    updateDate:Date;

    constructor(id:number,name:string,basicSalary:any,status:boolean,updateDate:Date){
        this.id = id;
        this.name = name;
        this.basicSalary = basicSalary;
        this.status = status;
        this.updateDate = updateDate;
    }

}
