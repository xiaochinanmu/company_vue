<!-- 
<template>
  <div class="common-layout">
   
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px"><AsiDe /></el-aside>
        <el-main><HelloWorld /><LoaDing /></el-main>
      </el-container>

  </div>
</template> -->
<!-- <template>
  <div class="common-layout">
    <el-container>
      <el-header :style="{ border: '1px solid yellow',display: 'flex', alignItems: 'center', justifyContent: 'center' }">Header</el-header>
      <el-container>
        <el-aside width="200px" :style="{ border: '1px solid yellow' }"><AsiDe /></el-aside>
        <el-main :style="{ border: '1px solid yellow' }"><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsiDe from './components/Aside.vue';
export default {
  name: 'App',
  components: {
    // HelloWorld,
    // LoaDing,
    AsiDe
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  /* margin-top: 60px; */
}
</style> -->


<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">
      <!-- Header 部分 -->
      <el-header 
        :style="{ 
          border: '1px solid yellow', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '60px'  /* 固定 Header 高度 */ 
        }"
      >
        Header
      </el-header>

      <!-- 主内容区域 -->
      <el-container style="height: calc(100vh - 60px);"> <!-- 60px 留给 Header -->
        <!-- Aside 部分 -->
        <el-aside width="200px" :style="{ border: '1px solid yellow', height: '100%' }">
          <AsiDe />
        </el-aside>

        <!-- Main 部分 -->
        <el-main 
          :style="{ 
            border: '1px solid yellow', 
            height: '100%', 
            overflowY: 'auto'  /* 使 Main 部分可滚动 */ 
          }"
        >
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsiDe from './components/Aside.vue';
export default {
  name: 'App',
  components: {
    AsiDe
  }
}
</script>

<style>
/* 确保所有元素的高度计算不受到边距和内边距的影响 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 占满整个视口 */
}

.el-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.el-header {
  flex-shrink: 0; /* 防止 Header 被压缩 */
}

.el-main {
  flex-grow: 1; /* 使 Main 部分占据剩余空间 */
  overflow-y: auto; /* 使 Main 内容区域可滚动 */
}
</style>
