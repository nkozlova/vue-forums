export enum DataType {
    Forum = 'forum',
    Topic = 'topic'
}

export class CBaseData {
    id: number
    title: string

    constructor(data: CBaseData) {
        this.id = data.id
        this.title = data.title
    }

    getType() : DataType {
        throw new Error("Not implemented")
    }
}

export class CForumData extends CBaseData {
    getType() { return DataType.Forum }
}

export class CTopicData extends CBaseData {
    forumId: number

    constructor(data: CTopicData) {
        super(data)
        this.forumId = data.forumId
    }

    getType() { return DataType.Topic }
}
