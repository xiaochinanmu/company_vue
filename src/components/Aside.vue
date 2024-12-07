<template>
    <el-row class="tac">
      <el-col :span="24">
        <h5 class="mb-2">菜单</h5>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-menu-item index="/TongJi">
            <el-icon><Menu /></el-icon>
            <span>统计</span>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon><document /></el-icon>
            <span>上线</span>
          </el-menu-item>
          <el-menu-item index="/Loading">
            <el-icon><setting /></el-icon>
            <span>上线</span>
          </el-menu-item>
          <el-menu-item index="/Test_a">
            <el-icon><setting /></el-icon>
            <span>统计</span>
          </el-menu-item>
          <el-menu-item index="/BingtuChart">
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