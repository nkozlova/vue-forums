<template>
    <div class="flex justify-content-center">
        <h1>Forums Page</h1>
    </div>

    <Button @click="showAddDialog = true" class="m-4">Add new Forum</Button>
    <AddForumDialog v-model:visible="showAddDialog" @add="addItem" />

    <Table ref="itemsList" 
        :api="forumApi"
        :hardFilter="new CForumFilter"
        v-model:selectedItem="selectedItem"
        :canGoInside="true"
        @goInside="$emit('goInside', selectedItem)" />
</template>

<script setup lang="ts">
    import { forumApi } from "@/ts/api"
    import AddForumDialog from "@/components/dialogs/AddForumDialog.vue"
    import Table from "@/components/Table.vue"
    import { CForumFilter } from '@/interfaces'
    import controller from "./controller/controller"

    defineEmits(['goInside'])
    
    const {selectedItem, itemsList, showAddDialog, addItem} = controller({
        api: forumApi
    })
</script>
