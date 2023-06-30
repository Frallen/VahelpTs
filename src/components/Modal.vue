<template>
  <transition name="fade">
    <div class="modal" v-show="isShow">
      <div class="modal-head">
        <div class="icon" @click.stop="emit('closeModal',false)">
          <img src="@/assets/images/close.svg">
        </div>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

interface propsType {
  isShow: boolean
}

const {isShow} = defineProps<propsType>()

const emit = defineEmits<{ (e: "closeModal", closeModal: boolean): void }>()

</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  height: auto;
  max-width: 450px;
  width: 100%;
  right: 0;
  left: 0;
  top: 25%;
  margin: 0 auto;
  background: #2626267F;
  display: flex;
  flex-direction: column;
  z-index: 99;
  border-left: 1px solid $black;
  backdrop-filter: blur(8px);
  padding: 20px 15px;
  @media #{$xs} {
    max-width: 320px;
  }

  &-head {
    display: flex;
    justify-content: flex-end;

    .icon {
      cursor: pointer;
    }
  }

  &-body {
    position: relative;

  }
}
</style>