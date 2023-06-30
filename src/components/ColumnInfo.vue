<template>
  <div class="column">
    <div class="column-header" :style="bgColor"><h5>{{ item.name }}</h5>
      <span v-if="item.Posts&&item.Posts.length">
        {{ item.Posts.length }}
      </span>
    </div>
    <div class="column-list"
         @dragover.prevent
         @dragenter.prevent
         @drop="drop($event, item.id)">
      <transition-group name="fade">
        <div class="column-list-item" :key="p.id" v-for="p in item.Posts"
             draggable="true"
             @dragstart="startDrag($event,p)"
        >
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
      </transition-group>
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
import {computed} from "vue";

interface propsType {
  item: userType
  bgColor: string
}

const store = useStore()
const {item, bgColor} = defineProps<propsType>()
const startDrag = (e: Event, p: postType) => {
  store.commit("setDragElement", p)
}

const draggedElement = computed<postType>(() => store.getters.preparedCell)
const drop = async (e: Event, newOwnerID: number) => {
  store.commit('DeleteCell', {userId: draggedElement.value.userId, postId: draggedElement.value.id})
  draggedElement.value.userId = newOwnerID
  store.commit('AddPost',
      draggedElement.value
  )
};

</script>

<style scoped lang="scss">
.column {
  display: flex;
  flex-direction: column;

  &-header {
    border: 1px dashed #fff;
    padding: 10px;
    height: 50px;
    color: #fff;
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
    height: 100%;
    padding: 0 10px;

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