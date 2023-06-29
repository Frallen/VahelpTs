<template>
<Suspense>
  <div></div>
</Suspense>
</template>

<script setup lang="ts">
import {useStore} from 'vuex'

const index = useStore()
index.dispatch("PrepareUsers")

</script>

<style lang="scss">

</style>
