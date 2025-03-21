<template>
    <div class="flex justify-content-center">
        <h1>Forums Page</h1>
    </div>

    <Button @click="showAddDialog = true" class="m-4">Add new Forum</Button>
    <AddDialog v-model:visible="showAddDialog" :dataType="DataType.Forum" @add="addForum" />

    <Table ref="forumsList" 
        :api="forumApi"
        :hardFilter="new CFilter"
        v-model:selectedItem="selectedForum"
        :canGoInside="true"
        @goInside="$emit('goInside', selectedForum)" />
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { forumApi } from "@/ts/api"
    import AddDialog from "./AddDialog.vue"
    import Table from "@/components/Table.vue"
    import { DataType, CForumData } from "@/interfaces/CTypes"
    import { CFilter } from '@/interfaces/CFilter'

    defineEmits(['goInside'])

    const selectedForum = ref<CForumData|null>(null)
    const forumsList = ref()

    const showAddDialog = ref(false)
    let addForum = async (title: string) => {
        if (!title || !forumsList.value) return

        const data = new CForumData(-1, title)
        await forumApi.addItem(data)
        forumsList.value.updateItems()
    }
</script>
