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
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>
            </div>
        </template>
        <template #empty> No items to present</template>
        <template #loading> We are loading... Please wait... </template>

        <!--Content-->
        <Column field="title" header="Title" sortable></Column>
        <!-- Колонка с переходом к форуму -->
        <Column v-if="props.canGoInside"
            header=""
            style="width: 150px">
            <template #body="{ data }">
                <Button v-if="data == selectedItem"
                    @click="$emit('goInside')" 
                    class="flex justify-content-end ml-2">Go inside</Button>
            </template>
        </Column>
        <!-- Колонка с удалением -->
        <Column header="" style="width: 30px">
            <template #body="{ data }">
                <Button v-if="data == selectedItem"
                    @click="() => deleteItem(data.id)" 
                    class="flex justify-content-end ml-2">X</Button>
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
    import { IBaseData } from "@/interfaces/CTypes"
    import { CFilter } from "@/interfaces/CFilter"
    import { CApi } from "@/ts/api"

    const selectedItem = defineModel<IBaseData|null>('selectedItem')
    const props = defineProps<{api: CApi, 
        hardFilter: CFilter, 
        canGoInside?: boolean}>()
    defineEmits(['goInside'])

    // Все элементы для представления в таблице
    const items = ref<IBaseData[]>([])
    const updateItems = async () => items.value = await props.api.loadItems(props.hardFilter)

    // Удаление элемента
    const deleteItem = async(id: number) => {
        await props.api.deleteItem(id)
        updateItems()
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