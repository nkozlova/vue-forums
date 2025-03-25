<template>
    <Dialog v-model:visible="visible"
        modal 
        header="Новый Форум" 
        :style="{ width: '25rem' }">

        <IftaLabel>
            <InputText id="title"
                v-model="title" fluid />
            <label for="title">Название</label>
        </IftaLabel>
        
        <template #footer>
            <Button type="button" 
                label="Отменить" 
                severity="secondary"
                @click="visible = false" />
            <Button type="button"
                label="Создать"
                @click="onAdd"
                :disabled="!title" />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
    import Dialog from "primeVue/dialog"
    import InputText from "primeVue/inputtext"
    import IftaLabel from 'primevue/iftalabel'
    import { ref } from "vue"
    import { CForumData } from "@/interfaces"

    const visible = defineModel<boolean>('visible')
    const emit = defineEmits(["add"])

    const title = ref("")
    let onAdd = () => {
        visible.value = false
        emit('add', {id: -1, title: title.value} as CForumData)
        title.value = ""
    }
</script>
