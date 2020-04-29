export interface UserDto {
    rut: string;
    password: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    mobile: string;
    role?: string;
    dateBirth: Date;
}