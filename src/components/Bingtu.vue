<template>
    <div>
      <!-- 饼状图 -->
      <el-card class="chart-card" >
        <template #header>
          <span>地区设备数量</span>
        </template>
        <div ref="pieChart" class="chart-container"></div>
      </el-card>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  import { ElCard } from 'element-plus';
  import axios from 'axios'; // 导入 axios
  
  export default {
    name: 'BingtuChart',
    components: {
      ElCard,
    },
    setup() {
      const pieChart = ref(null);
      const responseData = ref([]); // 用于存储请求的设备数据
  
      // 请求数据并解析
      const fetchData = async () => {
        try {
            const data = {
                bind_status: [1],
                // end_time: 1733327999,
                page: 1,
                page_size: 999,
                sort: 'asc',
                // start_time: 1733241600
            };
          const response = await axios.post('http://console.wintoo.io/api/v4/device/device_status_list',data); // 替换为你的 API 接口
          responseData.value = response.data.response.data; // 获取数据数组
  
          // 在数据成功获取后，初始化图表
          initCharts();
        } catch (error) {
          console.error('请求数据失败:', error);
        }
      };
  
      // 统计各地区设备数量
      const getDistrictDeviceCount = (data) => {
        const districtCount = {};
  
        data.forEach((item) => {
          const district = item.district_name || '未分配地区'; // 如果没有地区名称，归为“未分配地区”
          if (districtCount[district]) {
            districtCount[district] += 1;
          } else {
            districtCount[district] = 1;
          }
        });
  
        // 转换为 ECharts 需要的格式
        return Object.keys(districtCount).map((district) => ({
          name: district,
          value: districtCount[district],
        }));
      };
  
      // 初始化图表
      const initCharts = () => {
        if (!pieChart.value) return;
  
        const pieChartInstance = echarts.init(pieChart.value);
  
        // 统计每个地区的设备数量
        const pieData = getDistrictDeviceCount(responseData.value);
  
        pieChartInstance.setOption({
          title: {
            text: '设备地区分布',
            subtext: '设备数量统计',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              name: '地区',
              type: 'pie',
              radius: '70%',
              data: pieData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        });
      };
  
      // 在组件挂载后请求数据
      onMounted(() => {
        fetchData(); // 请求数据
      });
  
      return {
        pieChart,
      };
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    height: 900px;
  }
  </style>
  