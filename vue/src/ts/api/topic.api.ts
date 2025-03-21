import { CFilter, CTopicFilter } from "@/interfaces/CFilter";
import { IBaseData, CTopicData } from "@/interfaces/CTypes";
import { CApi } from "./api";

export class CTopicApi extends CApi {
    // Загрузка данных
    async loadItems(baseFilter: CFilter): Promise<IBaseData[]> {
        let forumId = (baseFilter as CTopicFilter).idForum
        let {data} = await this.post(this.getRoot(`getTopics/${forumId}`))
        return data.map((x: any) => new CTopicData(x.id, x.title, x.forum_id))
    }
    
    // Добавление нового элемента
    async addItem(base: IBaseData): Promise<void> {
        let title = base.title
        let forumId = (base as CTopicData).forum_id
        await this.post(this.getRoot(`add/${forumId}`), {title})
    }
    
    // Удаление элемента
    async deleteItem(id: number): Promise<void> {
        await this.post(this.getRoot(`delete/${id}`))
    }
}

export const topicApi = new CTopicApi("topics")
