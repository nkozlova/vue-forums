<template>
    <Dialog v-model:visible="visible"
        modal 
        header="Add new Topic" 
        :style="{ width: '25rem' }">

        <IftaLabel>
            <InputText id="title"
                v-model="title" fluid />
            <label for="title">Title</label>
        </IftaLabel>
        
        <template #footer>
            <Button type="button" 
                label="Cancel" 
                severity="secondary"
                @click="visible = false" />
            <Button type="button"
                label="Add"
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
    import { CTopicData } from "../../interfaces"

    const visible = defineModel<boolean>('visible')
    const { forumId } = defineProps<{forumId: number}>()
    const emit = defineEmits(["add"])

    const title = ref("")
    let onAdd = () => {
        visible.value = false
        emit('add', {id: -1, title: title.value, forumId: forumId} as CTopicData)
        title.value = ""
    }
</script>
