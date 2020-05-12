import { MedicalOfficeDto } from "./medical-office.dto";
import { UserDto } from "./user.dto";

export interface MedicalAppointmentDto {
    schedule: Date;
    medicalOffice: MedicalOfficeDto;
    userDoctor: UserDto;
}
