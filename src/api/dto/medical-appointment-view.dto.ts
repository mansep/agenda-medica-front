export interface MedicalAppointmentViewDto {
    id: number;
    doctorRut: string;
    doctorId: number;
    doctorName: string;
    doctorLastName: string;
    schedule: Date;
    officeId: number;
    officeCode: string;
    officeName: string;
    specialityId: number;
    specialityode: string;
    specialityName: string;
    officeFloor: string;
    buildingId: number;
    buildingName: string;
    buildingCode: string;
    centerId: number;
    centerName: string;
    centerCode: string;
    centerAddress: string;
    centerEmail: string;
    centerPhone: string;
}
