import { CFilter } from "@/interfaces/CFilter";
import { IBaseData } from "@/interfaces/CTypes";
import  CApiBase  from "./apiBase";

export class CApi extends CApiBase {
        constructor(url = "") {
                url = url ? url +  "/" : ""
                super("/" + url);
        }

        // Загрузка данных
        async loadItems(_filter: CFilter): Promise<IBaseData[]> {
                throw new Error("Non inmplemented error")
        }

        // Добавление нового элемента
        async addItem(_base: IBaseData): Promise<void> {
                throw new Error("Non inmplemented error")
        }

        // Удаление элемента
        async deleteItem(_id: number): Promise<void> {
                throw new Error("Non inmplemented error")
        }
}

export const api = new CApi()
