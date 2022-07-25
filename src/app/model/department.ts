export class Department {
    id :number;
    departmentCode :string;
    nameDepartment :string;
    status :any;
    updateDate :Date ;

    constructor(id:number,departmentCode:string,nameDepartment:string,status:boolean,updateDate:Date){
        this.id = id;
        this.departmentCode = departmentCode;
        this.nameDepartment = nameDepartment;
        this.status = status;
        this.updateDate = updateDate;
    }



}
