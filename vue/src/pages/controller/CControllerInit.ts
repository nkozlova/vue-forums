import {CApi} from "@/ts/api";
import { CEditing, CEditTemplate, CFilter } from '@/interfaces';

export interface CControllerInit {
        // Поддержка нескольких табов основного окна. Используется в окне ObjectWindow, MapWindow
        supportTab ?: boolean

        // Поддержка окном фильтрации списка объектов. Используется в окне ObjectWindow, MapWindow - номер вкладки с фильтрами
        filterTabIndex ?: string
        classFilter ?: typeof CFilter

        // Поддержка дополнительных данных для редактирования. Используется в окне ObjectWindow, IllustratorWindow, LocationWindow
        supportPrepareEdit ?: boolean

        // api класс для связи с сервером
        api : CApi

        // Основной конфиг-класс работы окна
        classRow ?: typeof CEditing,

        // Класс дополнительных данных
        classAdditionalData ?: typeof CEditTemplate,

        // hardFilter для основного списка
        //hardFilter ?: TFilter

        // Дополнительные действия перед открытием окна исправлений и созданий
        initEditData ?: (data : CEditing|null) => any

        // Список полейб требующих перезагрузки списка после изменения данных
        reloadSaveFields ?: string[]

        // Сообщение для удаления элемента списка
        removeMessage?: string
}
