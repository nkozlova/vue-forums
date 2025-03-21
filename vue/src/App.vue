<template>
    <Forums v-if="!showedForum" @goInside="(forum: CForumData) => showedForum=forum" />
    <Topics v-else :forum="showedForum" @return="showedForum=null" />
</template>

<script setup lang="ts">
    import Forums from "./pages/Forums.vue"
    import Topics from "./pages/Topics.vue"
    import { ref } from 'vue'
    import { CForumData } from "@/interfaces/CTypes"

    const showedForum = ref<CForumData | null>(null)
</script>
