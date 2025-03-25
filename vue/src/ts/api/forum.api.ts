import { CBaseFilter } from "@/interfaces/CFilter";
import { CBaseData, CForumData } from "@/interfaces/CTypes";
import { CApi } from "./api";

export class CForumApi extends CApi {
    // Загрузка данных
    async loadItems(_: CBaseFilter): Promise<CBaseData[]> {
        const {data} = await this.post(this.getRoot("getForums"))
        return data.map((x: any) => new CForumData(x))
    }

    // Добавление нового элемента
    async addItem(base: CBaseData): Promise<void> {
        const title = base.title
        await this.post(this.getRoot("add"), {title})
    }

    // Удаление элемента
    async deleteItem(id: number): Promise<void> {
        await this.post(this.getRoot(`delete/${id}`))
    }

    // Редактирование элемента
    async editItem(base: CBaseData): Promise<void> {
        const id = base.id
        const title = base.title
        await this.post(this.getRoot(`edit/${id}`), {title})
    }
}

export const forumApi = new CForumApi("forums")
