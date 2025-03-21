import { DataType } from "./CTypes"

export class CBaseFilter {
    type: DataType

    constructor(type: DataType) {
        this.type = type
    }
}

export class CForumFilter extends CBaseFilter {
    constructor() {
        super(DataType.Forum)
    }
}

export class CTopicFilter extends CBaseFilter {
    idForum: number

    constructor(idForum: number) {
        super(DataType.Topic)
        this.idForum = idForum
    }
}
