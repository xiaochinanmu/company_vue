<template>
    <div>
      <!-- 饼状图 -->
      <el-card class="chart-card">
        <template #header>
          <span>饼状图</span>
        </template>
        <div ref="pieChart" class="chart-container"></div>
      </el-card>
  
      <!-- 堆叠柱状图 -->
      <el-card class="chart-card" style="margin-top: 20px;">
        <template #header>
          <span>销售统计图（堆叠柱状图）</span>
        </template>
        <div ref="stackedBarChart" class="chart-container"></div>
      </el-card>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  import { ElCard } from 'element-plus';
  
  export default {
    name: 'ChartComponent',
    components: {
      ElCard,
    },
    setup() {
      // 引用饼状图和堆叠柱状图的DOM元素
      const pieChart = ref(null);
      const stackedBarChart = ref(null);
  
   


      // 数据
      const pieData = [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' },
      ];
  
      const barData = {
        categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        completed: [820, 932, 901, 934, 1290, 1330, 1320], // 完成的销售
        notCompleted: [300, 400, 500, 450, 600, 650, 700], // 未完成的销售
      };
  
      // 初始化图表
      const initCharts = () => {
        // 饼状图
        const pieChartInstance = echarts.init(pieChart.value);
        pieChartInstance.setOption({
          title: {
            text: '访问来源',
            subtext: '2024年数据',
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
              name: '访问来源',
              type: 'pie',
              radius: '50%',
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
  
        // 堆叠柱状图
        const stackedBarChartInstance = echarts.init(stackedBarChart.value);
        stackedBarChartInstance.setOption({
          title: {
            text: '月度销售统计（堆叠柱状图）',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {
            top: '10%',
            data: ['销售完成量', '销售未完成量'],
          },
          grid: {
            top: '20%',
            bottom: '20%',
          },
          xAxis: {
            type: 'category',
            data: barData.categories,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '销售未完成量',
              type: 'bar',
              data: barData.notCompleted,
              stack: '总量', // 堆叠设置
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#f44336', // 未完成量使用红色
              },
            },
            {
              name: '销售完成量',
              type: 'bar',
              data: barData.completed,
              stack: '总量', // 堆叠设置
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#4caf50', // 完成量使用绿色
              },
            },
          ],
        });
      };
  
      // 在组件挂载后初始化图表
      onMounted(() => {
        initCharts();
      });
  
      return {
        pieChart,
        stackedBarChart,
      };
    },
  };

// import axios from 'axios'; // 引入 axios


// export default {
//   name: 'ChartComponent',
//   components: {
//     ElCard,
//   },
//   setup() {
//     // 引用饼状图和堆叠柱状图的DOM元素
//     const pieChart = ref(null);
//     const stackedBarChart = ref(null);

//     // 用来存储从API获取的数据
//     const pieData = ref([]);
//     const barData = ref({
//       categories: [],
//       completed: [],
//       notCompleted: [],
//     });

//     // 从SPI获取饼图数据
//     const fetchPieData = async () => {
//       try {
//         const postData = {
//         page: 1, page_size: 10, sort: "asc"
//       };
//         const response = await axios.post('http://console.wintoo.io/api/v4/vehicle/vehicle_list',postData);
//         pieData.value = response.data; // 假设返回的数据格式为：[{ value: 335, name: '直接访问' }, ...]
//       } catch (error) {
//         console.error('获取饼图数据失败:', error);
//       }
//     };

//     // 从SPI获取柱状图数据
//     const fetchBarData = async () => {
//       try {
//         const postData = {
//         page: 1, page_size: 10, sort: "asc"
//       };
//         const response = await axios.post('http://console.wintoo.io/api/v4/vehicle/vehicle_list',postData);
//         barData.value = response.data; // 假设返回的数据格式为：{ categories: [], completed: [], notCompleted: [] }
//       } catch (error) {
//         console.error('获取柱状图数据失败:', error);
//       }
//     };

//     // 初始化图表
//     const initCharts = () => {
//       // 饼状图
//       const pieChartInstance = echarts.init(pieChart.value);
//       pieChartInstance.setOption({
//         title: {
//           text: '访问来源',
//           subtext: '2024年数据',
//           left: 'center',
//         },
//         tooltip: {
//           trigger: 'item',
//         },
//         legend: {
//           orient: 'vertical',
//           left: 'left',
//         },
//         series: [
//           {
//             name: '访问来源',
//             type: 'pie',
//             radius: '50%',
//             data: pieData.value,
//             emphasis: {
//               itemStyle: {
//                 shadowBlur: 10,
//                 shadowOffsetX: 0,
//                 shadowColor: 'rgba(0, 0, 0, 0.5)',
//               },
//             },
//           },
//         ],
//       });

//       // 堆叠柱状图
//       const stackedBarChartInstance = echarts.init(stackedBarChart.value);
//       stackedBarChartInstance.setOption({
//         title: {
//           text: '月度销售统计（堆叠柱状图）',
//           left: 'center',
//         },
//         tooltip: {
//           trigger: 'axis',
//           axisPointer: {
//             type: 'shadow',
//           },
//         },
//         legend: {
//           top: '10%',
//           data: ['销售完成量', '销售未完成量'],
//         },
//         grid: {
//           top: '20%',
//           bottom: '20%',
//         },
//         xAxis: {
//           type: 'category',
//           data: barData.value.categories,
//         },
//         yAxis: {
//           type: 'value',
//         },
//         series: [
//           {
//             name: '销售未完成量',
//             type: 'bar',
//             data: barData.value.notCompleted,
//             stack: '总量', // 堆叠设置
//             emphasis: {
//               focus: 'series',
//             },
//             itemStyle: {
//               color: '#f44336', // 未完成量使用红色
//             },
//           },
//           {
//             name: '销售完成量',
//             type: 'bar',
//             data: barData.value.completed,
//             stack: '总量', // 堆叠设置
//             emphasis: {
//               focus: 'series',
//             },
//             itemStyle: {
//               color: '#4caf50', // 完成量使用绿色
//             },
//           },
//         ],
//       });
//     };

//     // 在组件挂载后获取数据并初始化图表
//     onMounted(async () => {
//       await Promise.all([fetchPieData(), fetchBarData()]); // 同时获取数据
//       initCharts(); // 数据加载完毕后初始化图表
//     });

//     return {
//       pieChart,
//       stackedBarChart,
//     };
//   },
// };
  </script>
  
  <style scoped>
  .chart-card {
    padding: 20px;
    background-color: #fff;
  }
  
  .chart-container {
    width: 100%;
    height: 400px;
  }
  </style>
  