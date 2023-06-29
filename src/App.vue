<template>
  <Suspense>
    <Table></Table>
  </Suspense>
  <Modal :isShow="store.state.ModalState" @closeModal="store.commit('changeModalState',false)"></Modal>
</template>

<script setup lang="ts">
import Table from "@/components/Table.vue";
import Modal from "@/components/Modal.vue";
import {useStore} from "vuex";

const store = useStore()
</script>

<style lang="scss">

</style>
