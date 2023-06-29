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
  position: absolute;
  height: 100%;
  max-width: 250px;
  width: 100%;
  right: 0;
  top: 0;
  background: #2626267F;
  display: flex;
  flex-direction: column;
  z-index: 99;
  border-left: 1px solid $black;
  backdrop-filter: blur(8px);
  padding: 20px 15px;
  &-head {
    display: flex;
    justify-content: flex-end;

    .icon {
      cursor: pointer;
    }
  }

  &-body {
    position: relative;
    @media #{$sm} {
      min-width: 320px;
      padding: 2em 10px 1.5em;
    }
  }
}
</style>