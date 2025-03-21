export enum DataType {
    Forum = 'forum',
    Topic = 'topic'
}

export interface IBaseData {
    id: number
    title: string
}

export class CForumData implements IBaseData {
    id: number
    title: string

    constructor(id: number, title: string) {
        this.id = id
        this.title = title
    }
}

export class CTopicData implements IBaseData {
    id: number
    title: string
    forum_id: number

    constructor(id: number, title: string, forum_id: number) {
        this.id = id
        this.title = title
        this.forum_id = forum_id
    }
}
