<template>
  <div class="container">
    <div class="container-left">
      <div class="container-title">楼层导航</div>
      <draggable
        class="container-left-dragArea"
        v-model="rawList"
        :group="{ name: 'template', pull: 'clone', put: false }"
        :clone='clone'
        @start='start'
        @end='end'
        @change="log"
      >
        <div
          class="container-left-list-item"
          v-for="element in rawList"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>
    <div class="container-center">
      <div class="container-title">画布</div>
      <draggable
        class="container-center-dragArea"
        v-model="generateList"
        group="template"
        @change="log"
      >
        <div
          :class="{
          'container-center-list-item': true, 
          'container-center-list-item-dragging' :  dragging
          }"
          v-for="element in generateList"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "vue-drag-demo",
  components: {
    draggable
  },
  data() {
    return {
      rawList: Array.from(new Array(3).keys()).map(index => {
          return {
              name:'模版'+ (index + 1),
              id:index
          } 
      }),
      generateList: [],
      idIndex: 1,
      dragging: false
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    clone(evt){
        const obj = {
            id: this.idIndex,
            name: evt.name + '-模板实例' + this.idIndex
        }
        this.idIndex = this.idIndex + 1
        return obj
    },
    start(){
        this.dragging = true
    },
    end(){
        this.dragging = false
    }
  }
};
</script>

<style scoped lang="less">
.container{
    overflow: hidden;
    padding-bottom: 40px;
    &-title{
        background-color: #ddd;
        text-align: center;
        padding: 5px;
    }
    &-left{
        border: 1px solid #ddd;
        float: left;
        width: 200px;
        margin: 0 20px;

        &-list{
            text-align: center;

            &-item{
                text-align: center;
                border-bottom: 1px solid #ddd;
                margin: 10px 0;
                padding: 5px 0;
            }
        }
    }

    &-center{
        border: 1px solid #ddd;
        float: left;
        width: 375px;

         &-dragArea{
            min-height: 750px;
        }

        &-list{
            width: 100%;
            &-item{
                height: 100px;
                width: 100%;
                border: 1px solid #ddd;
                line-height: 100px;
                text-align: center;

                &-dragging{
                    border-top: 10px solid blue;
                    border-bottom: 10px solid blue;
                }
            }
        }
    }
    
}
</style>
