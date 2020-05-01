import { SERVICIO_ENDPOINT } from '../constants';
import { MedicalSpecialityDto } from '../dto/medical-center.dto';
import { Request } from '../request';

const request = new Request(SERVICIO_ENDPOINT);

export class MedicalCenter {
    static async getAll() {
        return await request.get('/medical-center/');
    }

    static async get(id?: number) {
        return await request.get(`/medical-center/${id}`);
    }

    static async create(esp: MedicalSpecialityDto) {
        return await request.post('/medical-center/', esp);
    }

    static async update(esp: MedicalSpecialityDto, id?: number) {
        return await request.put(`/medical-center/${id}`, esp);
    }

    static async delete(id?: number) {
        return await request.delete(`/medical-center/${id}`);
    }
}