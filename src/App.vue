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
<template>
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
// import HelloWorld from './components/HelloWorld.vue'
// import LoaDing from './components/loading.vue';
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
</style>