<template>
    <Button @click="$emit('return')" class="m-4">Список форумов</Button>

    <div class="flex justify-content-center">
        <h1>ТЕМЫ форума "{{ forum.title }}"</h1>
    </div>

    <Button @click="showAddDialog = true" class="m-4">Новая тема</Button>
    <AddTopicDialog v-model:visible="showAddDialog"
        :forumId="forum.id"
        @add="addItem" />

    <EditTopicDialog v-if="showEditDialog"
        v-model:visible="showEditDialog"
        :initialTopic="selectedItem as CTopicData"
        @edit="editItem" />

    <Table ref="itemsList" 
        :api="topicApi"
        :hardFilter="new CTopicFilter(forum.id)"
        v-model:selectedItem="selectedItem"
        @edit="showEditDialog = true" />
</template>

<script setup lang="ts">
    import { topicApi } from "../ts/api"
    import AddTopicDialog from "@/components/dialogs/AddTopicDialog.vue"
    import EditTopicDialog from "@/components/dialogs/EditTopicDialog.vue"
    import Table from "@/components/Table.vue"
    import { CForumData, CTopicFilter, CTopicData } from '@/interfaces'
    import controller from "./controller/controller"

    const { forum } = defineProps<{'forum': CForumData}>()
    defineEmits(["return"])
    
    const {selectedItem, itemsList, showAddDialog, addItem, showEditDialog, editItem} = controller({
        api: topicApi
    })
</script>
