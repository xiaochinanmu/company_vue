<!-- <template>
    <div>
    
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
        name: 'Test_a',
        components: {
        ElCard,
        },
        setup() {
        // 引用饼状图和堆叠柱状图的DOM元素
        const stackedBarChart = ref(null);
        const barData = {
            categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
            completed: [820, 932, 901, 934, 1290, 1330, 1320], // 完成的销售
            notCompleted: [300, 400, 500, 450, 600, 650, 700], // 未完成的销售
        };
    
        // 初始化图表
        const initCharts = () => {
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
            stackedBarChart,
        };
        },
    };
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
</style> -->
<template>
  <el-card>
    <h3>呵呵呵</h3>
  </el-card>
    <el-card>
      <div ref="stackedBarChart" style="width: 100%; height: 400px;"></div>
    </el-card>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  import { ElCard } from 'element-plus';
  import axios from 'axios';
  
  export default {
    name: 'DeviceStatusChart',
    components: {
      ElCard,
    },
    setup() {
      const stackedBarChart = ref(null);
      const barData = {
        categories: [], // 存储各区的名称
        online: [], // 各区设备上线数量
        offline: [], // 各区设备不上线数量
      };
  
      // 初始化图表
      const initCharts = () => {
        const stackedBarChartInstance = echarts.init(stackedBarChart.value);
        stackedBarChartInstance.setOption({
          title: {
            text: '各区设备状态统计（堆叠柱状图）',
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
            data: ['设备上线', '设备未上线'],
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
              name: '设备上线',
              type: 'bar',
              data: barData.online,
              stack: '设备状态',
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#4caf50', // 未上线设备使用红色4caf50
              },
            },
            {
              name: '设备未上线',
              type: 'bar',
              data: barData.offline,
              stack: '设备状态',
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#f44336', // 上线设备使用绿色
              },
            },
          ],
        });
      };
  
      // 获取设备数据
      const fetchDeviceData = async () => {
        try {
            const data = {
                bind_status: [1],
                end_time: 1733414399,
                page: 1,
                page_size: 999,
                sort: 'asc',
                start_time: 1732896000
            };
          const response = await axios.post("http://console.wintoo.io/api/v4/device/device_status_list", data);
  
          if (response.status === 200) {
            const devices = response.data.response.data;
            const districtStats = {};
  
            devices.forEach(item => {
              const district = item.district_name; // 获取设备所在的区
              const isOnline = item.upload_count > 0; // 判断设备是否在线
  
              if (!districtStats[district]) {
                districtStats[district] = { online: 0, offline: 0 };
              }
  
              if (isOnline) {
                districtStats[district].online += 1; // 设备上线
              } else {
                districtStats[district].offline += 1; // 设备未上线
              }
            });
  
            // 将统计结果整理为图表需要的数据
            const districtData = Object.keys(districtStats).map(district => ({
              district_name: district,
              offline_count: districtStats[district].offline,
              online_count: districtStats[district].online,
            }));
  
            // 更新 barData 用于堆叠图
            barData.categories = districtData.map(item => item.district_name);
            barData.offline = districtData.map(item => item.offline_count);
            barData.online = districtData.map(item => item.online_count);
  
            // 更新图表
            initCharts();
          }
        } catch (error) {
          console.error("请求失败:", error);
        }
      };
  
      // 在组件挂载后初始化图表并获取设备数据
      onMounted(() => {
        fetchDeviceData();
      });
  
      return {
        stackedBarChart,
      };
    },
  };
  </script>
  
  <style scoped>
  /* 样式调整 */
  </style>
  