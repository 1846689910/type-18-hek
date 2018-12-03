interface Human{
    name: string;
 }
 export class People implements Human{
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
 } 