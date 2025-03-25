<template>
    <div class="flex justify-content-center">
        <h1>ФОРУМЫ</h1>
    </div>

    <Button @click="showAddDialog = true" class="m-4">Новый форум</Button>
    <AddForumDialog v-model:visible="showAddDialog" @add="addItem" />

    <EditForumDialog v-if="showEditDialog"
        v-model:visible="showEditDialog"
        :initialForum="selectedItem as CForumData"
        @edit="editItem" />

    <Table ref="itemsList" 
        :api="forumApi"
        :hardFilter="new CForumFilter"
        v-model:selectedItem="selectedItem"
        :canGoInside="true"
        @goInside="(item: CForumData) => $emit('goInside', item)"
        @edit="showEditDialog = true" />
</template>

<script setup lang="ts">
    import { forumApi } from "@/ts/api"
    import AddForumDialog from "@/components/dialogs/AddForumDialog.vue"
    import EditForumDialog from "@/components/dialogs/EditForumDialog.vue"
    import Table from "@/components/Table.vue"
    import { CForumData, CForumFilter } from '@/interfaces'
    import controller from "./controller/controller"

    defineEmits(['goInside'])

    const {selectedItem, itemsList, showAddDialog, addItem, showEditDialog, editItem} = controller({
        api: forumApi
    })
</script>
