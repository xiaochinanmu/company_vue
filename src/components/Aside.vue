<template>
  
    <el-row class="tac">
      <el-col :span="24" style="text-align: center; margin-top: 20px;">
        <h4 class="mb-2">菜单</h4>
        <el-menu
          active-text-color="#409EFF"
          background-color="#fff"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="black"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-menu-item index="/BingtuChart">
            <el-icon><Menu /></el-icon>
            <span>设备数量分布</span>
          </el-menu-item>
          <el-menu-item index="/Test_a">
            <el-icon><document /></el-icon>
            <span>上线数量图</span>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon><setting /></el-icon>
            <span>时间内上线查询</span>
          </el-menu-item>
          <el-menu-item index="/Loading">
            <el-icon><setting /></el-icon>
            <span>统计</span>
          </el-menu-item>
          <el-menu-item index="/TongJi">
            <el-icon><setting /></el-icon>
            <span>饼图</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

  </template>
  
  <!-- <script lang="ts" setup>
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script> -->
  <script>
  // import { iconmenu } from '@element-plus/icons-vue'
  export default {
    name: 'AsiDe',
    components: {
      // iconmenu
    },
    data(){
        return{
            // str:"hello",
            path: this.$route.path
            
        }
    }
  }
  </script>