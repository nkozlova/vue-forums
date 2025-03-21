import {computed, nextTick, ref, watch} from 'vue'
import { CControllerInit } from './CControllerInit'
import {CEditing, CFilter, IListElement} from '@/interfaces'
import common from '@/ts/common'


export default function controller(init:CControllerInit) {
        const loaded = ref(false)
        const selectedObject = ref<IListElement|null>(null)
        const list = ref()
        //const store = AtlasStore()

        /**
         НЕСКОЛЬКО ТАБОВ
         */
        const activeTab = ref("0")
        const updateTab = (idx : string) => {
//                if(typeof idx === "number") console.log("number")
  //              if(typeof idx === "string") console.log("string")
    //            console.log(idx)
                activeTab.value = idx;
        }

        //const state = ref(new TState())
        async function updateState() {
                /*if(!init.api) return
                const {data} = await init.api.getState(init.supportChangeAtlas ? selectAtlas.value : null)
                if(!data) return;
                state.value = data as TState;*/
        }


        /**
          ФИЛЬТРАЦИЯ
         * */
        const countRecord = ref(0)
        const hideFilter = ref(false)
        const isViewFilter = computed(() => activeTab.value == init.filterTabIndex && !hideFilter.value)
        const customFilter = ref<CFilter|null>(null)
        const currentFilter = ref<CFilter>(init.classFilter ? new init.classFilter() : new CFilter)

        const viewRecords = computed(() => customFilter.value === null ? ` (${countRecord.value})` : ` (найдено ${countRecord.value})`)

        const applyFilter = (filter : CFilter) => {
                if(!init.classFilter) return
                if(activeTab.value === init.filterTabIndex) {
                        currentFilter.value = new init.classFilter(filter)
                }
                customFilter.value = new init.classFilter(filter)
//                init.api?.saveFilter(customFilter.value)
        }
        const clearFilter = () => {
                if(!init.classFilter) return
                if(activeTab.value === init.filterTabIndex) {
                        applyFilter(init.classFilter ? new init.classFilter() : new CFilter)
                }
                else {
                        customFilter.value = null
                }
        }

        const onLoadedList = (event : {records:[], total:number}) => {
                //if(activeTab.value === init.filterTabIndex) state.value["filter"] = event.total
        }

        watch(activeTab, () => {
                if(!init.classFilter) return
                if(activeTab.value === init.filterTabIndex) {
                        customFilter.value = new init.classFilter(currentFilter.value)
                } else clearFilter()
        })


        /**
          РЕДАКТИРОВАНИЕ
         */
        const visibleEditor = ref(false)
        const editingData = ref<CEditing|null>(null)
        const realEditingData = ref<CEditing|null>(null)
        const additionalEditorData = ref()
        async function initEditData(data:CEditing|null) {
                editingData.value = null
                await nextTick()

                if(init.supportPrepareEdit) {
                        let ret = await init.api.prepareEdit(data ? data.id : null)
                        if(ret && init.classAdditionalData)
                                additionalEditorData.value = new init.classAdditionalData(ret)
                }

                if(data) {
                        editingData.value = new init.classRow(data)
                }
                else {
                        editingData.value = new init.classRow()
                }

                return data
        }
        const addRow = async () => {
                if(init.initEditData) await init.initEditData(null)
                else await initEditData(null)
                realEditingData.value = null
                visibleEditor.value = true
        }
        const editRow = async (data:CEditing) => {
                if(init.initEditData) await init.initEditData(data) as CEditing
                else await initEditData(data) as CEditing
                realEditingData.value = data
                selectedObject.value = data as IListElement
                visibleEditor.value = true
        }
        const save = async (data:CEditing) => {
                if (!title) return

                await init.api.addRow(title)
                updateList()
        }
        const getDataForSave = () => {
                return realEditingData.value
//                if(!realEditingData.value) return null
  //              let rr = (new JsonSerializer()).serialize(realEditingData.value)
    //            return rr
        }
        const removeRow = async (data : CEditing) => {
                if(!data.id || !init.api) return;
                if(await common.shureRemove(init.removeMessage||"Вы действительно хотите удалить?")) {
                        await init.api.remove(data.id)
                        list.value.onLoadList()
                        updateState()
                }
        }

        async function onStart() {
                if(init.supportTab) await updateState()
/*                if(init.filterTabIndex && init.api && init.classFilter) {
                        const {data} = await init.api.loadPrefsFilter()
                        if(data) customFilter.value = (new JsonSerializer()).deserialize(data, init.classFilter) as CFilter
                }*/
                loaded.value = true
        }

        onStart()

        return {
                loaded, list, selectedObject,
                countRecord, viewRecords,
                activeTab, updateState, updateTab,
                onLoadedList, customFilter,
                hideFilter, isViewFilter, applyFilter, clearFilter,
                visibleEditor, editingData, additionalEditorData, realEditingData, addRow, editRow, save, getDataForSave, removeRow, initEditData
        }
}
