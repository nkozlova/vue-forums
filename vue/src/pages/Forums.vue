<template>
    <div class="flex justify-content-center">
        <h1>Forums Page</h1>
    </div>

    <Button @click="showAddDialog = true" class="m-4">Add new Forum</Button>
    <AddDialog v-model:visible="showAddDialog" :dataType="init.hardFilter.type" @add="addItem" />

    <Table ref="itemsList" 
        :api="init.api"
        :hardFilter="init.hardFilter"
        v-model:selectedItem="selectedItem"
        :canGoInside="true"
        @goInside="$emit('goInside', selectedItem)" />
</template>

<script setup lang="ts">
    import { forumApi } from "@/ts/api"
    import AddDialog from "./AddDialog.vue"
    import Table from "@/components/Table.vue"
    import { CForumFilter } from '@/interfaces'
    import { IControllerInit } from "./controller/CControllerInit"
    import controller from "./controller/controller"

    defineEmits(['goInside'])
    
    const init = {
        api: forumApi,
        hardFilter: new CForumFilter
    } as IControllerInit
    const {selectedItem, itemsList, showAddDialog, addItem} = controller(init)
</script>
