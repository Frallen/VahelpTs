<template>
  <div class="table">
    <div class="table-wrapper">
      <div class="table-column" v-for="item in PreparedTable" :key="item.id">
        <ColumnInfo :item="item"></ColumnInfo>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useStore} from "vuex";
import ColumnInfo from "@/components/ColumnInfo.vue";
import {computed} from "vue";

const store = useStore()
const PreparedTable = computed(() =>
    store.getters.preparedUsers
)
const index = useStore()
await index.dispatch("PrepareUsers")

</script>

<style scoped lang="scss">
.table {
  overflow: auto;
  height: 100vh;
  width: 100%;
  margin: 1em;

  &-wrapper {
    display: flex;
    flex-wrap: nowrap;
    margin: 0 0 0 -20px;
  }

  &-column {
    min-width: 200px;
    max-width: 200px;
    margin: 0 0 0 20px;
  }

}
</style>