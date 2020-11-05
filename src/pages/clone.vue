<template>
  <div class="container">
    <!-- 楼层导航 -->
    <div class="container-left">
      <div class="container-title">楼层导航</div>
      <draggable
        class="container-left-dragArea"
        v-model="rawList"
        :group="{ name: 'template', pull: 'clone', put: false }"
        :clone="clone"
        @start="start"
        @end="end"
        @change="log"
      >
        <div
          class="container-left-list-item"
          v-for="element in rawList"
          :key="element.name"
        >
          <img :src="element.imgUrl" style="width: 200px; height: 140px" />
          {{ element.name }}
        </div>
      </draggable>
    </div>

    <!-- 画布 -->
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
            'container-center-list-item-dragging': dragging,
            'container-center-list-item-active': activeEelementId == element.id,
          }"
          @click="selectElement(element)"
          v-for="(element, index) in generateList"
          :key="element.id"
        >
          <img :src="element.imgUrl" style="width: 100%" />
          {{ element.name }}
          <div
            class="container-center-list-item-tool"
            v-if="activeEelementId == element.id"
          >
            <div
              class="container-center-list-item-tool-item"
              @click.stop="moveUp(index)"
            >
              上移
            </div>
            <div
              class="container-center-list-item-tool-item"
              @click.stop="moveDown(index)"
            >
              下移
            </div>
            <div
              class="container-center-list-item-tool-item"
              @click.stop="deleteElement(index)"
            >
              删除
            </div>
          </div>
        </div>
      </draggable>
    </div>

    <!-- 信息配置 -->
    <div class="container-right" v-if="activeEelement">
      <div class="container-title">信息配置</div>
      <div class="container-right-item">
        模板实例ID：{{ activeEelement.id }}
      </div>
      <div class="container-right-item">
        模板名称：{{ activeEelement.name.split("-")[0] }}
      </div>
      <div class="container-right-item">
        模板实例名称：{{ activeEelement.name }}
      </div>
      <div class="container-right-item">
        模板图片：<img
          :src="activeEelement.imgUrl"
          style="width: 200px; display: block; padding: 10px 0"
        />
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  name: "vue-drag-demo",
  components: {
    draggable,
  },
  data() {
    return {
      rawList: [
        {
          imgUrl:
            "http://minio.jdmpaas.com/us-east-1/853ea5205afd49cc9ee5fb75ea273a00.jpg?width=1013&height=592",
          name: "模版1",
          id: 1,
        },
        {
          imgUrl:
            "http://minio.jdmpaas.com/us-east-1/5361ad3794414367b8a65c752a62627c.png?width=440&height=275",
          name: "模版2",
          id: 2,
        },
        {
          imgUrl:
            "http://minio.jdmpaas.com/us-east-1/8a466e9ee9d94c82b676f702d8a012dd.png?width=569&height=265",
          name: "模板3",
          id: 3,
        },
      ],

      generateList: [],
      idIndex: 1,
      dragging: false,
      activeEelementId: "",
      activeEelement: null,
    };
  },
  methods: {
    log: function (evt) {
      this.activeEelementId = evt.added.element.id;
      this.activeEelement = evt.added.element;
    },
    clone(evt) {
      const obj = {
        id: this.idIndex,
        name: evt.name + "-模板实例" + this.idIndex,
        imgUrl: evt.imgUrl,
      };
      this.idIndex = this.idIndex + 1;
      return obj;
    },
    start() {
      this.dragging = true;
    },
    end() {
      this.dragging = false;
    },
    selectElement(element) {
      this.activeEelementId = element.id;
      this.activeEelement = element;
    },
    moveUp(index) {
      if (index == 0) {
        this.$message({
          message: "已经是第一个了，不能上移～",
          type: "warning",
        });
        return;
      }
      const curElement = this.generateList.splice(index, 1);
      this.generateList.splice(index - 1, 0, curElement[0]);
    },
    moveDown(index) {
      if (index == this.generateList.length - 1) {
        this.$message({
          message: "已经是最后一个了，不能下移～",
          type: "warning",
        });
        return;
      }
      const curElement = this.generateList.splice(index, 1);
      this.generateList.splice(index + 1, 0, curElement[0]);
    },
    deleteElement(index) {
      this.generateList.splice(index, 1);
      this.$message({
        message: "删除成功",
        type: "success",
      });
      if (index != this.generateList.length) {
        this.activeEelementId = this.generateList[index].id;
        this.activeEelement = this.generateList[index];
      } else {
        if (index != 0) {
          this.activeEelementId = this.generateList[index - 1].id;
          this.activeEelement = this.generateList[index - 1];
        } else {
          this.activeEelementId = "";
          this.activeEelement = null;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
  overflow: hidden;
  padding-bottom: 40px;
  &-title {
    background-color: #ddd;
    text-align: center;
    padding: 5px;
  }
  &-left {
    border: 1px solid #ddd;
    float: left;
    width: 200px;
    margin: 0 60px 0 300px;

    &-list {
      text-align: center;

      &-item {
        text-align: center;
        border-bottom: 1px solid #ddd;
      }
    }
  }

  &-center {
    border: 1px solid #ddd;
    float: left;
    width: 450px;
    margin-right: 200px;

    &-dragArea {
      min-height: 750px;
    }

    &-list {
      width: 100%;
      &-item {
        position: relative;
        width: 100%;
        border: 1px solid #ddd;
        text-align: center;

        &-dragging {
          border-top: 10px solid blue;
          border-bottom: 10px solid blue;
        }

        &-active {
          border: 1px solid blue;
        }

        &-tool {
          position: absolute;
          right: -45px;
          width: 40px;
          top: 50%;
          transform: translateY(-50%);
          border: 1px solid #ddd;
          font-size: 14px;

          &-item {
            padding: 5px 0;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
          }
        }
      }
    }
  }

  &-right {
    float: left;
    width: 400px;

    &-item {
      padding: 10px 20px;
    }
  }
}
</style>
