<template>
<div>
 <!-- <draggable
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
       </draggable> -->
       <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
</draggable> 

<draggable v-model="myArray">
    <transition-group>
        <div v-for="element in myArray" :key="element.id">
            {{element.name}}
        </div>
    </transition-group>
</draggable>

<draggable v-model="myArray" draggable=".item">
    <div v-for="element in myArray" :key="element.id" class="item">
        {{element.name}}
    </div>
    <button slot="footer" @click="addPeople">Add</button>
</draggable>

</div>
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
      }),
      myArray:[
        {
          id:1,      
          name:'zxy'
        },
         {
          id:2,      
          name:'hhh'
        },
      ]
    }
  },
  methods:{
    addPeople(){
      this.myArray.push(
        {
          id:this.myArray.length + 1,
          name:this.myArray.length + 1+'name'
        }
      )
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
