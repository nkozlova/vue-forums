import {useCookies} from "vue3-cookies"

class ButtonInfo {
        name: string
        func: () => void

        constructor(nm: string, fn: () => void) {
                this.name = nm
                this.func = fn
        }
}

export class CDlgData {
        header: string
        visible: boolean
        closable: boolean
        message: string
        icon: string
        class: string
        id : number
        check : boolean
        buttons: ButtonInfo[]
        resolve: ((param?: boolean) => void) | null
        hide: () => void

        constructor() {
                this.header = 'Ошибка'
                this.visible = false
                this.closable = true
                this.message = ''
                this.icon = ''
                this.class = ''
                this.buttons = []
                this.resolve = null
                this.id = 0
                this.check = false
                this.hide = () => {/**/}
        }

        clear() {
                this.header = 'Ошибка'
                this.visible = false
                this.closable = true
                this.message = ''
                this.hide = () => {/**/
                }
        }
}

const common = {
        dlgData: new CDlgData(),
        dlgError: new CDlgData(),
        dlgAfterSave : new CDlgData(),

        init(dlg: CDlgData, dlgerr: CDlgData, dlgas: CDlgData) {
                this.dlgData = dlg
                this.dlgError = dlgerr
                this.dlgAfterSave = dlgas
        },

        shureRemove(msg: string) {
                return this.shure(msg, '<i class=\'pi pi-exclamation-triangle\'></i>', 'Удалить')
        },

        shureRestore(msg: string) {
                return this.shure(msg, '<i class=\'pi pi-exclamation-triangle\'></i>', 'Восстановить')
        },

        async shure(msg: string, icon?: string, btn?: string, header?: string) {
                this.dlgData.message = msg
                this.dlgData.icon = icon || ''
                this.dlgData.header = header || 'Удаление'
                this.dlgData.class = 'hint'
                this.dlgData.closable = true
                this.dlgData.visible = true
                this.dlgData.buttons = [
                        new ButtonInfo(btn || 'Да', () => {
                                if (this.dlgData.resolve) this.dlgData.resolve(true)
                                this.dlgData.visible = false
                        })
                ]
                this.dlgData.hide = () => {
                        if (this.dlgData.resolve) this.dlgData.resolve(false)

                }
                return new Promise((resolve) => this.dlgData.resolve = resolve)
        },

        async viewDlgAfterSave(id : number) {
                const {cookies} = useCookies()
                switch(cookies.get("afterSave")) {
                        case "more": return true
                        case "cancel": return false
                }
                this.dlgAfterSave.closable = true
                this.dlgAfterSave.visible = true
                this.dlgAfterSave.id = id
                this.dlgAfterSave.check = false
                this.dlgAfterSave.buttons = [
                        new ButtonInfo("Продолжить", () => {
                                if(this.dlgAfterSave.check) cookies.set("afterSave", "more")
                                if (common.dlgAfterSave.resolve) common.dlgAfterSave.resolve(true)
                                common.dlgAfterSave.visible = false
                        }),
                        new ButtonInfo("Отмена", () => {
                                if(this.dlgAfterSave.check) cookies.set("afterSave", "cancel")
                                if (common.dlgAfterSave.resolve) common.dlgAfterSave.resolve(false)
                                common.dlgAfterSave.visible = false
                        })
                ]
                this.dlgAfterSave.hide = () => {
                        if(this.dlgAfterSave.resolve) this.dlgAfterSave.resolve(false)
                }

                return new Promise((resolve) => this.dlgAfterSave.resolve = resolve)
        },

        viewError(msg: string) {
                this.dlgError.message = msg
                this.dlgError.visible = true
        },

        viewMessage(msg: string) {
                this.dlgData.header = 'Сообщение'
                this.dlgData.message = msg
                this.dlgData.closable = true
                this.dlgData.visible = true
        },

        waitDialog(msg: string) {
                this.dlgData.header = 'Внимание!'
                this.dlgData.message = msg
                this.dlgData.closable = false
                this.dlgData.visible = true
        },

        closeWaitDialog() {
                this.dlgData.visible = false
        },

        scrollListToSelect(list:any) {
                if (!list || !list.$el) return
                let hl = list.$el.getElementsByClassName('p-listbox-option-selected')
                if (!hl.length) return
                list.$el.getElementsByClassName('p-listbox-list-container')[0].scrollTop = hl[0].offsetTop - hl[0].parentNode.offsetTop
        },

        scrollDataTableToSelect(list:any) {
                if (!list) return
                let hl = list.getElementsByClassName('p-selectable-row p-highlight')
                if (!hl.length) return
                let topSelEl = hl[0].offsetTop - hl[0].parentNode.offsetTop
                hl[0].parentNode.parentNode.parentNode.scrollTop = topSelEl
//                list.getElementsByClassName("p-listbox-list-wrapper")[0].scrollTop = topSelEl
        },

        dateDate(dateStr: string|null) {
                if (dateStr == null) return null
                let ares = dateStr.split('.')
                return new Date(`${ares[1]}.${ares[0]}.${ares[2]}`)
        },

        dateFormatSave(dateStr: string | Date | null) {
                if(dateStr === null) return null
                if (!dateStr) return ''

                let date = (typeof dateStr === 'string') ? this.dateDate(dateStr) : dateStr
                if(date === null) return null

                let dd: string | number = date.getDate()
                let mm: string | number = date.getMonth() + 1 //January is 0!
                if (dd < 10) dd = '0' + dd
                if (mm < 10) mm = '0' + mm
                return `${date.getFullYear()}-${mm}-${dd}`
        },

        // Эта функция вызывается из 2 мест
        // 1 - из датапикера для преобразования Date в текстовый вид
        // 2 - из базы данных, где данный в виде строки, но в другом формате
        dateFormatView(dateStr: string | Date | null) {
                if(dateStr === null) return null
                let date = new Date(dateStr)
                let dd: string | number = date.getDate()
                let mm: string | number = date.getMonth() + 1
                if (dd < 10) dd = '0' + dd
                if (mm < 10) mm = '0' + mm
                return `${dd}.${mm}.${date.getFullYear()}`
        },

        /*statusFormatView(statusIdStr:string) {
            switch (statusIdStr) {
                case 'new':
                    return 'Новый'
                    break
                case 'active':
                    return 'Действующий'
                    break
                case 'inactive':
                    return 'Недействующий'
                    break
                case 'фксрш':
                    return 'Недействующий'
                    break
            }
        }*/

        /**
         * Создание секретного кода
         * */
        createSecretCode() {
                const letters = 'abcdefghijklmnoprqstuvwxyzABCDEFGHIJKLMNOPRQSTUVWXYZ1234567890'
                let code = ''
                for (let i = 0; i < 8; i++) {
                        code += letters[Math.floor(Math.random() * 62)]
                }
                return code
        },

        updateLicenseData(access_period: string) {
            if (!access_period) return '';
            let ret:string[][] = [...access_period.matchAll(/(\d+)([n|m|y])/g)]
            if(ret.length === 1 && ret[0].length === 3) {
                switch (ret[0][2]) {
                    case 'n':
                        return `на ${ret[0][1]} ${this.getPadejN(ret[0][1])}`
                    case 'm':
                        return `на ${ret[0][1]} ${this.getPadejM(ret[0][1])}`
                    case 'y':
                        return `на ${ret[0][1]} ${this.getPadejY(ret[0][1])}`
                }
                return `${ret[0][1]}`
            } else {
                return `до ${common.dateFormatView(new Date(access_period))}`
            }
        },

        getPadejN(num: string) {
            return 'недели'
        },

        getPadejM(num: string) {
            return 'месяцы'
        },

        getPadejY(num: string) {
            return 'год'
        }
}

export default common
