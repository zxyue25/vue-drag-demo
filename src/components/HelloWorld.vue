<template>
 <draggable
        class="list-group"
        tag="ul"
        v-model="list"
        v-bind="{
          animation: 200,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost'
        }"
      >
          <li
            class="list-group-item"
            v-for="element in list"
            :key="element.order"
          >
            {{ element.name }}
          </li>
      </draggable>
</template>

<script>
import Draggable from "vuedraggable"
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
]

export default {
  name: 'HelloWorld',
  components: {
    Draggable
  },
  data () {
    return {
       list: message.map((name, index) => {
        return { name, order: index + 1 };
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  list-style: none;
}
.list-group-item {
  cursor: move;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
}
</style>
