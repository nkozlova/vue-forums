<template>
    <Dialog v-model:visible="visible"
        modal 
        :header="header" 
        :style="{ width: '25rem' }">

        <IftaLabel>
            <InputText id="title"
                v-model="topic.title" 
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
                :disabled="!topic.title || topic.title == initialTopic.title" />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
    import Dialog from "primeVue/dialog"
    import InputText from "primeVue/inputtext"
    import IftaLabel from 'primevue/iftalabel'
    import { CTopicData } from "@/interfaces"
    import { ref, computed } from 'vue'

    const visible = defineModel<boolean>('visible')
    const { initialTopic } = defineProps<{initialTopic: CTopicData}>()
    const emit = defineEmits(['edit'])

    const topic = ref<CTopicData>(new CTopicData(initialTopic))

    const header = computed(() => `Редактировать Топик '${initialTopic.title}'`)

    let onEdit = () => {
        visible.value = false
        emit("edit", topic.value)
    }
</script>
