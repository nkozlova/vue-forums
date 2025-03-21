<template>
    <Button @click="$emit('return')" class="m-4">Return to Forums</Button>

    <div class="flex justify-content-center">
        <h1>Topics Page / Forum "{{ forum.title }}"</h1>
    </div>

    <Button @click="showAddDialog = true" class="m-4">Add new Topic</Button>
    <AddDialog v-model:visible="showAddDialog"
        :dataType="DataType.Topic"
        @add="addTopic" />

    <Table ref="topicsList" 
        :api="topicApi"
        :hardFilter="new CTopicFilter(forum.id)"
        v-model:selectedItem="selectedTopic" />
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { topicApi } from "../ts/api"
    import AddDialog from "./AddDialog.vue"
    import Table from "@/components/Table.vue"
    import { CForumData, CTopicData, DataType } from "@/interfaces/CTypes"
    import { CTopicFilter } from '@/interfaces/CFilter'

    const { forum } = defineProps({'forum': {type: CForumData, required: true}})
    defineEmits(["return"])

    const selectedTopic = ref<CTopicData|null>(null)
    const topicsList = ref()

    const showAddDialog = ref(false)
    let addTopic = async (title: string) => {
        if (!title || !topicsList.value) return

        const data = new CTopicData(-1, title, forum.id)
        await topicApi.addItem(data)
        topicsList.value.updateItems()
    }
</script>
