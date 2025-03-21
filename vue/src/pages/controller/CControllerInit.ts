import { CApi } from "../../ts/api"
import { CBaseFilter } from '../../interfaces';

export interface IControllerInit {
        // api класс для связи с сервером
        api : CApi

        // hardFilter для основного списка
        hardFilter : CBaseFilter
}
