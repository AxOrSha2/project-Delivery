export class Producto {

    _id?: any;
    nombre: string;
    img: string;
    descripcion: string;
    proveedor: string;
    precio: number;
    unidadesDisponibles: number;

    constructor(nombre: string, img: string, descripcion: string, proveedor: string, precio: number, unidadesDisponibles: number) {
        this.nombre = nombre;
        this.img = img;
        this.descripcion = descripcion;
        this.proveedor = proveedor;
        this.precio = precio;
        this.unidadesDisponibles = unidadesDisponibles;
    }

}