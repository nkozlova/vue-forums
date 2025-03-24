import { ref } from 'vue'
import { IControllerInit } from './CControllerInit'
import { CBaseData } from '@/interfaces'

export default function controller(init: IControllerInit) {
    const selectedItem = ref<CBaseData|null>(null) // Выбранный элемент из списка

    const itemsList = ref() // Именованная ссылка на лист

    const showAddDialog = ref(false) // Показать ли диалог добавления новой записи

    // Добавление нового элемента
    const addItem = async (data: CBaseData) => {
        await init.api.addItem(data)

        if (!itemsList.value) return
        itemsList.value.updateItems() // Обновляем список, чтобы подтянуть новые данные для отображения
    }

    return {selectedItem, itemsList, showAddDialog, addItem}
}
