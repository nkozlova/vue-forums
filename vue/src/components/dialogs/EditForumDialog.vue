<template>
    <Dialog v-model:visible="visible"
        modal 
        :header="header" 
        :style="{ width: '25rem' }">

        <IftaLabel>
            <InputText id="title"
                v-model="forum.title" 
                fluid />
            <label for="title">Название</label>
        </IftaLabel>
        
        <template #footer>
            <Button type="button" 
                label="Отменить" 
                severity="secondary"
                @click="visible = false" />
            <Button type="button"
                label="Редактировать"
                @click="onEdit"
                :disabled="!forum.title || forum.title == initialForum.title" />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
    import Dialog from "primeVue/dialog"
    import InputText from "primeVue/inputtext"
    import IftaLabel from 'primevue/iftalabel'
    import { CForumData } from "@/interfaces"
    import { ref, computed } from 'vue'

    const visible = defineModel<boolean>('visible')
    const { initialForum } = defineProps<{initialForum: CForumData}>()
    const emit = defineEmits(['edit'])

    const forum = ref<CForumData>(new CForumData(initialForum))

    const header = computed(() => `Редактировать Форум '${initialForum.title}'`)

    let onEdit = () => {
        visible.value = false
        emit("edit", forum.value)
    }
</script>
