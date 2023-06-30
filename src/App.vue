<template>
  <Suspense>
    <Table></Table>
  </Suspense>
  <Modal :isShow="store.state.ModalState.show"
         @closeModal="store.commit('changeModalState',{edit:false,show:false} as modalType);
         store.commit('changeEditableCell',
            {
              userId: '',
              id: '',
              title: '',
              body: ''
            })">
    <form @submit.prevent="store.commit(store.state.ModalState.edit?'ChangePostContent':'AddPost', modalContent);
            store.commit('changeModalState',{edit:false,show:false} as modalType)"
          class="form">
      <div class="form-title">{{ store.state.ModalState.edit ? 'Редактирование' : 'Добавление' }}</div>
      <label for="title">
        <span>Название поста</span>
        <input id="title" type="text" v-model="modalContent.title" class="input">
      </label>
      <label for="text">
        <span>Текст поста</span>
        <textarea id="text" v-model="modalContent.body" class="textarea"/>
      </label>
      <button type="submit" class="button button-primary"
      >Подтвердить
      </button>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import Table from "@/components/Table.vue";
import Modal from "@/components/Modal.vue";
import {useStore} from "vuex";
import {computed, reactive, watch} from "vue";

const store = useStore()
const preparedModalContent = computed(() => store.getters.preparedModalContent)
const modalContent = reactive<postType>(preparedModalContent.value)

watch(preparedModalContent, () => {
  modalContent.body = preparedModalContent.value.body
  modalContent.id = preparedModalContent.value.id
  modalContent.title = preparedModalContent.value.title
  modalContent.userId = preparedModalContent.value.userId
})

</script>

<style lang="scss">

</style>
