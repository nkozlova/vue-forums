import { CBaseFilter } from "@/interfaces/CFilter";
import { IBaseData, CForumData } from "@/interfaces/CTypes";
import { CApi } from "./api";

export class CForumApi extends CApi {
    // Загрузка данных
    async loadItems(_: CBaseFilter): Promise<IBaseData[]> {
        let {data} = await this.post(this.getRoot("getForums"))
        return data.map((x: any) => new CForumData(x.id, x.title))
    }

    // Добавление нового элемента
    async addItem(base: IBaseData): Promise<void> {
        let title = base.title
        await this.post(this.getRoot("add"), {title})
    }

    // Удаление элемента
    async deleteItem(id: number): Promise<void> {
        await this.post(this.getRoot(`delete/${id}`))
    }
}

export const forumApi = new CForumApi("forums")
