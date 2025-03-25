<template>
    <DataTable 
        v-model:filters="filters"
        v-model:selection="selectedItem" selectionMode="single"
        :value="items"
        stripedRows 
        paginator :rows="5"
        removableSort 
        class="data" >
        
        <template #header>
            <div class="flex justify-content-end">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Поиск" />
                </IconField>
            </div>
        </template>
        <template #empty> Данных нет</template>
        <template #loading> Идет загрузка... Пожалуйста, подождите... </template>

        <!-- Содержимое -->
        <Column field="title" header="Название" sortable>
            <template v-if="props.canGoInside" #body="{ data }">
                <Button :label="data.title"
                    variant="link"
                    @click="$emit('goInside', data)" />
            </template>
        </Column>
        <!-- Колонка с переходом к форуму -->
        <Column v-if="props.canGoInside"
            header=""
            style="width: 150px">
            <template #body="{ data }">
                <Button v-if="data == selectedItem"
                    @click="$emit('goInside', data)" 
                    class="flex justify-content-end ml-2">Открыть</Button>
            </template>
        </Column>
        <!-- Колонка с редактированием -->
        <Column header="" style="width: 30px">
            <template #body="{ data }">
                <Button v-if="data == selectedItem"
                    icon="pi pi-pencil"
                    v-tooltip.bottom="'Редактировать'"
                    @click="$emit('edit')" />
            </template>
        </Column>
        <!-- Колонка с удалением -->
        <Column header="" style="width: 30px">
            <template #body="{ data }">
                <Button v-if="data == selectedItem"
                    icon="pi pi-trash"
                    v-tooltip.bottom="'Удалить'"
                    @click="() => deleteItem(data.id)" />
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
    import DataTable, { DataTableFilterMeta } from 'primevue/datatable'
    import Column from 'primevue/column'
    import IconField from 'primevue/iconfield'
    import InputIcon from 'primevue/inputicon'
    import InputText from "primeVue/inputtext"
    import { ref, onMounted, defineExpose } from "vue"
    import { CBaseData } from "@/interfaces/CTypes"
    import { CBaseFilter } from "@/interfaces/CFilter"
    import { CApi } from "@/ts/api"
    import { useConfirm } from "primevue/useconfirm";

    const selectedItem = defineModel<CBaseData|null>('selectedItem')
    const props = defineProps<{api: CApi, 
        hardFilter: CBaseFilter, 
        canGoInside?: boolean}>()
    defineEmits(['goInside', 'edit'])

    // Все элементы для представления в таблице
    const items = ref<CBaseData[]>([])
    const updateItems = async () => items.value = await props.api.loadItems(props.hardFilter)

    // Удаление элемента
    const deleteConfirm = useConfirm();
    const deleteItem = async(id: number) => {
        deleteConfirm.require({
            message: 'Are you sure you want to delete this item?',
            header: 'Delete Confirmation', 
            accept: async () => {
                await props.api.deleteItem(id)
                updateItems()
            }
        });
    }

    // Фильтр на значения в таблице
    const filters = ref<DataTableFilterMeta>({global: {value: "", matchMode: 'contains'}})

    onMounted(updateItems)

    defineExpose({ updateItems }) // Позволяем обновлять из родителя
</script>

<style>

.data tr {
  height: 64px;
}
</style>