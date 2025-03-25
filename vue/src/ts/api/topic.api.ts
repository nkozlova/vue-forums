import { CBaseFilter, CTopicFilter } from "@/interfaces/CFilter";
import { CBaseData, CTopicData } from "@/interfaces/CTypes";
import { CApi } from "./api";

export class CTopicApi extends CApi {
    // Загрузка данных
    async loadItems(baseFilter: CBaseFilter): Promise<CBaseData[]> {
        const forumId = (baseFilter as CTopicFilter).idForum
        const {data} = await this.post(this.getRoot(`getTopics/${forumId}`))
        return data.map((x: any) => new CTopicData(x))
    }
    
    // Добавление нового элемента
    async addItem(base: CBaseData): Promise<void> {
        const title = base.title
        const forumId = (base as CTopicData).forumId
        await this.post(this.getRoot(`add/${forumId}`), {title})
    }
    
    // Удаление элемента
    async deleteItem(id: number): Promise<void> {
        await this.post(this.getRoot(`delete/${id}`))
    }

    // Редактирование элемента
    async editItem(base: CBaseData): Promise<void> {
        const title = base.title
        await this.post(this.getRoot(`edit/${base.id}`), {title})
    }
}

export const topicApi = new CTopicApi("topics")
