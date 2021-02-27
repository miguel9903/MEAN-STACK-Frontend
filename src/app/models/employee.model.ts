export class Employee {

    _id?: string;
    name: string;
    lastname: string;
    position: string;
    office: string;
    salary: number;
    age: number;
    image: string;

    constructor() {
        this.name = '';
        this.lastname = '';
        this.position =  '';
        this.office = '';
        this.salary = 0;
        this.age = 0;
        this.image = '';
    }

}