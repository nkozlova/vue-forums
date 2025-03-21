<template>
    <Button @click="$emit('return')" class="m-4">Return to Forums</Button>

    <div class="flex justify-content-center">
        <h1>Topics Page / Forum "{{ forum.title }}"</h1>
    </div>

    <Button @click="showAddDialog = true" class="m-4">Add new Topic</Button>
    <AddDialog v-model:visible="showAddDialog"
        :dataType="init.hardFilter.type"
        @add="addItem" />

    <Table ref="itemsList" 
        :api="init.api"
        :hardFilter="init.hardFilter"
        v-model:selectedItem="selectedItem" />
</template>

<script setup lang="ts">
    import { topicApi } from "../ts/api"
    import AddDialog from "./AddDialog.vue"
    import Table from "@/components/Table.vue"
    import { CForumData, CTopicFilter } from '@/interfaces'
    import { IControllerInit } from "./controller/CControllerInit"
    import controller from "./controller/controller"

    const { forum } = defineProps<{'forum': CForumData}>()
    defineEmits(["return"])
    
    const init = {
        api: topicApi,
        hardFilter: new CTopicFilter(forum.id)
    } as IControllerInit
    const {selectedItem, itemsList, showAddDialog, addItem} = controller(init)
</script>
