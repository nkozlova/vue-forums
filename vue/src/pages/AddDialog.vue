<template>
    <Dialog v-model:visible="visible"
        modal 
        :header="dlgTitle" 
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
    import { ref, computed } from "vue"
    import { DataType } from "@/interfaces/CTypes"

    const visible = defineModel<boolean>('visible')
    const { dataType } = defineProps<{dataType: DataType}>()

    const emit = defineEmits(["add"])

    const dlgTitle = computed(() => {
        switch (dataType) {
            case DataType.Forum: return "Add new Forum"
            case DataType.Topic: return "Add new Topic"
            default: throw new Error(`Unexpected type ${dataType}`)
        }
    })

    const title = ref("")
    let onAdd = () => {
        visible.value = false
        emit('add', title.value)
        title.value = ""
    }
</script>
