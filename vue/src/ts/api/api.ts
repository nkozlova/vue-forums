import { CBaseFilter } from "@/interfaces/CFilter";
import { CBaseData } from "@/interfaces/CTypes";
import  CApiBase  from "./apiBase";

export class CApi extends CApiBase {
    constructor(url = "") {
        url = url ? url +  "/" : ""
        super("/" + url);
    }

    // Загрузка данных
    async loadItems(_filter: CBaseFilter): Promise<CBaseData[]> {
        throw new Error("Non inmplemented error")
    }

    // Добавление нового элемента
    async addItem(_base: CBaseData): Promise<void> {
        throw new Error("Non inmplemented error")
    }

    // Удаление элемента
    async deleteItem(_id: number): Promise<void> {
        throw new Error("Non inmplemented error")
    }

    // Редактирование элемента
    async editItem(_base: CBaseData): Promise<void> {
        throw new Error("Non inmplemented error")
    }
}

export const api = new CApi()
