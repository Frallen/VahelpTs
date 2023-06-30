<template>
  <div class="column">
    <div class="column-header"><h5>{{ item.name }}</h5>
      <span v-if="item.Posts&&item.Posts.length">
        {{ item.Posts.length }}
      </span>
    </div>
    <div class="column-list">
      <div class="column-list-item" v-for="p in item.Posts">
        <div class="title">{{ p.title }}</div>
        <div class="subTitle">{{ p.body }}</div>
        <div class="buttons">
          <button class="button button-primary"
                  @click.stop="
                  store.commit('changeModalState', {edit:true,show:true} as modalType);
                  store.commit('changeEditableCell', p)">Изменить
          </button>
          <button class="button button-primary"
                  @click.stop="store.commit('DeleteCell',{userId:item.id,postId:p.id})">
            Удалить
          </button>
        </div>
      </div>
    </div>
    <button class="button button-primary"
            @click.stop=" store.commit('changeModalState', {edit:false,show:true} as modalType);
            store.commit('changeEditableCell',
            {
              id:item.Posts[item.Posts.length-1].id+1,
              userId:item.id
            }
            )">
      Добавить
    </button>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";

const store = useStore()

interface propsType {
  item: userType
}


const {item} = defineProps<propsType>()
</script>

<style scoped lang="scss">
.column {
  display: flex;
  flex-direction: column;

  &-header {
    border: 1px dashed #fff;
    padding: 10px;
    height: 50px;
    color: $green;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;

    h5 {
      font-size: 1.2em;
      @include text-eclipse(1);
      overflow: hidden;
    }

    span {
      font-size: 14px;
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 1em 0 2em;

    &-item {
      border: 1px solid $gray;
      @include br(10px);
      padding: 10px;
      color: $green;
      margin: 1em 0 0;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: 1em;
        overflow: hidden;
        font-weight: bold;
        @include text-eclipse(2);
      }

      .subTitle {
        overflow: hidden;
        @include text-eclipse(1);
      }

      .buttons {
        display: flex;
        flex-direction: column;

        .button:last-child {
          margin: 10px 0 0;
        }
      }
    }

    &-item:first-child {
      margin: 0;
    }
  }
}
</style>