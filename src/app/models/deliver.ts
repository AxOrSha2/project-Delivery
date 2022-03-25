export class Deliver {

    id?:any;
    nombre:string;
    direccion:string;
    telefono:string;
    correoElectronico:string;

    constructor( nombre:string, direccion: string, telefono: string, correoElectronico: string) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correoElectronico = correoElectronico;
    }

}