import { ref } from 'vue'
import { IControllerInit } from './CControllerInit'
import { IBaseData, CForumData, CTopicData, DataType, CTopicFilter } from '../../interfaces'

export default function controller(init: IControllerInit) {
        const selectedItem = ref<IBaseData|null>(null) // Выбранный элемент из списка

        const itemsList = ref() // Именованная ссылка на лист

        const showAddDialog = ref(false) // Показать ли диалог добавления новой записи

        // Добавление нового элемента
        const addItem = async (title: string) => {
                if (!title || !itemsList.value) return
        
                let data: IBaseData
                switch (init.hardFilter.type) {
                        case DataType.Forum:
                                data = new CForumData(-1, title)
                                break
                        case DataType.Topic:
                                data = new CTopicData(-1, title, (init.hardFilter as CTopicFilter).idForum)
                                break
                        default:
                                throw new Error("Unexpected type!")
                }
                await init.api.addItem(data)

                itemsList.value.updateItems() // Обновляем список, чтобы подтянуть новые данные для отображения
            }

        return {selectedItem, itemsList, showAddDialog, addItem}
}
