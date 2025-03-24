<template>
    <Button @click="$emit('return')" class="m-4">Return to Forums</Button>

    <div class="flex justify-content-center">
        <h1>Topics Page / Forum "{{ forum.title }}"</h1>
    </div>

    <Button @click="showAddDialog = true" class="m-4">Add new Topic</Button>
    <AddTopicDialog v-model:visible="showAddDialog"
        :forumId="forum.id"
        @add="addItem" />

    <Table ref="itemsList" 
        :api="topicApi"
        :hardFilter="new CTopicFilter(forum.id)"
        v-model:selectedItem="selectedItem" />
</template>

<script setup lang="ts">
    import { topicApi } from "../ts/api"
    import AddTopicDialog from "@/components/dialogs/AddTopicDialog.vue"
    import Table from "@/components/Table.vue"
    import { CForumData, CTopicFilter } from '@/interfaces'
    import controller from "./controller/controller"

    const { forum } = defineProps<{'forum': CForumData}>()
    defineEmits(["return"])
    
    const {selectedItem, itemsList, showAddDialog, addItem} = controller({
        api: topicApi
    })
</script>
