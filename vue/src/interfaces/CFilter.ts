
export class CFilter {
}

export class CTopicFilter extends CFilter {
    idForum: number

    constructor(idForum: number) {
        super()
        this.idForum = idForum
    }
}
