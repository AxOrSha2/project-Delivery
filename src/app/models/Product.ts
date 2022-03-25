export class Product {

    _id?: any;
    name: string;
    img: string;
    description: string;
    supplier: string;
    price: number;
    unitsAvailable: number;

    constructor(name: string, img: string, description: string, supplier: string, price: number, unitsAvailable: number) {
        this.name = name;
        this.img = img;
        this.description = description;
        this.supplier = supplier;
        this.price = price;
        this.unitsAvailable = unitsAvailable;
    }

}