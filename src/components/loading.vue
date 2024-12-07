<template>
  <el-card>
    <div >
      <h1>从 API 获取的数据:</h1>
      <div v-if="loading">加载中...</div>
      <div v-else-if="error">发生错误: {{ error }}</div>
      <div v-else>{{ data }}</div>
    </div>
  </el-card>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoaDing',
    data() {
      return {
        data: null,      // 存储从 API 获取的数据
        loading: true,   // 加载状态
        error: null      // 错误信息
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const postData = {
        page: 1, page_size: 10, sort: "asc"
      };
  
        try {
          // 使用 axios 发送 POST 请求
          const response = await axios.post('http://console.wintoo.io/api/v4/vehicle/vehicle_list', postData);
  
          // 假设 API 返回的数据直接是字符串
          this.data = response.data; // 这里直接获取返回的数据
        } catch (err) {
          this.error = err.message;
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  

  