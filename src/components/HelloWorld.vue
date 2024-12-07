<!-- <template>
  <div class="device-status">
    <h1>设备状态列表</h1>
    <div>
      <label for="start-time">开始时间:</label>
      <input type="text" v-model="startTimeInput" id="start-time" placeholder="MM-DD" />
      <label for="end-time">结束时间:</label>
      <input type="text" v-model="endTimeInput" id="end-time" placeholder="MM-DD" />
      <button @click="fetchData">查询</button>
    </div>

    <table v-if="devices.length > 0">
      <thead>
        <tr>
          <th>设备ID</th>
          <th>车牌号</th>
          <th>区域</th>
          <th>最后上线时间</th>
          <th>上传次数</th>
          <th>在线时长</th>
          <th>行驶距离</th>
          <th>是否上线</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in devices" :key="device.device_id">
          <td>{{ device.device_register_id }}</td>
          <td>{{ device.plate_number }}</td>
          <td>{{ device.district_name }}</td>
          <td>{{ device.last_work_time }}</td>
          <td>{{ device.upload_count }}</td>
          <td>{{ device.online_time }}</td>
          <td>{{ device.mileage }}</td>
          <td>{{ device.is_uplond }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name:'HelloWorld',
  data() {
    return {
      startTimeInput: "",  // 用户输入的开始时间
      endTimeInput: "1",   // 用户输入的结束时间 (默认当前时间)
      devices: [],         // 存储从 API 获取的设备数据
    };
  },
  methods: {
    async fetchData() {
  const currentYear = new Date().getFullYear();
  let startTimeStr = `${currentYear}-${this.startTimeInput} 01:00:00`;

  let endTimeStr = this.endTimeInput === "1" 
    ? new Date().toISOString() 
    : `${currentYear}-${this.endTimeInput} 23:59:59`;

  const startTime = new Date(startTimeStr).getTime() / 1000;  // 转换为 Unix 时间戳（秒）
  
  let endTime;
  if (this.endTimeInput === "1") {
    // 当结束时间为 "1" 时，默认使用当前时间，并转换为秒级时间戳
    endTime = Math.floor(new Date().getTime() / 1000);  // 获取当前时间戳（秒）
  } else {
    endTime = new Date(endTimeStr).getTime() / 1000;  // 转换为 Unix 时间戳（秒）
  }

  const data = {
    bind_status: [1],
    end_time: endTime,
    page: 1,
    page_size: 50,
    sort: 'asc',
    start_time: startTime
  };

  try {
    const response = await axios.post("http://console.wintoo.io/api/v4/device/device_status_list", data);
    if (response.status === 200) {
      const devices = response.data.response.data;
      this.devices = devices.map(item => ({
        device_register_id: item.device_register_id,
        plate_number: item.plate_number,
        district_name: item.district_name,
        last_work_time: new Date(item.last_work_time * 1000).toLocaleString(),
        upload_count: item.upload_count,
        online_time: item.online_time,
        mileage: item.mileage,
        is_uplond: item.upload_count > 0 ? "上线" : " "
      }));
    }
  } catch (error) {
    console.error("请求失败:", error);
  }
}

  }
};
</script>

<style scoped>
.device-status {
  margin: 20px;
}

input {
  margin: 0 10px;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style> -->




<template>
  <el-card class="device-status-card">
  <div class="device-status">
    <div style="display: flex; align-items: center;">
      <label for="start-time">开始时间:</label>
      <el-input v-model="startTimeInput" id="start-time" placeholder="MM-DD" style="width: 150px; margin-right: 20px;" />
      <label for="end-time">结束时间:</label>
      <el-input v-model="endTimeInput" id="end-time" placeholder="MM-DD" style="width: 150px; margin-right: 20px;" />
      <el-button @click="fetchData" type="primary"  style=" margin-right: 20px;" >查询</el-button>
      <label style=" margin-right: 5px;">分页功能</label>
      <el-switch v-model="value1"/>
    </div>

    <el-table :data="devices" style="width: 100%; margin-top: 0px;" >
      <el-table-column label="设备ID" prop="device_register_id" sortable></el-table-column>
      <el-table-column label="车牌号" prop="plate_number"></el-table-column>
      <el-table-column label="区域" prop="district_name" sortable></el-table-column>
      <el-table-column label="最后上线时间" prop="last_work_time"></el-table-column>
      <el-table-column label="上传次数" prop="upload_count"></el-table-column>
      <el-table-column label="在线时长" prop="online_time"></el-table-column>
      <el-table-column label="行驶距离" prop="mileage"></el-table-column>
      <el-table-column label="是否上线" prop="is_uplond"></el-table-column>
    </el-table>

    <!-- <div v-else>
      <p>暂无数据</p>
    </div> -->

  
    <el-pagination
      v-if="value1==true&&totalCount > 0"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalCount"
      @current-change="handlePageChange"
      layout="total, prev, pager, next, jumper"
    
      style="position: sticky; bottom: 0; left: 0; width: 100%; text-align: center; margin-top: 20px;"
    />
  </div>
</el-card>
</template>

<script>
import axios from "axios";
import { ElButton, ElInput, ElTable, ElTableColumn, ElPagination } from 'element-plus';

export default {
  name:'HelloWorld',
  components: {
    ElButton,
    ElInput,
    ElTable,
    ElTableColumn,
    ElPagination
  },
  data() {
    return {
      startTimeInput: "",  // 用户输入的开始时间
      endTimeInput: "1",   // 用户输入的结束时间 (默认当前时间)
      devices: [],         // 存储从 API 获取的设备数据
      totalCount: 0,       // 数据总数
      currentPage: 1,      // 当前页数
      pageSize: 20,         // 每页显示的数量
      value1:true
    };
  },
  methods: {
    async fetchData() {
      const currentYear = new Date().getFullYear();
      let startTimeStr = `${currentYear}-${this.startTimeInput} 01:00:00`;
      let endTimeStr = this.endTimeInput === "1" 
        ? new Date().toISOString() 
        : `${currentYear}-${this.endTimeInput} 23:59:59`;

      const startTime = new Date(startTimeStr).getTime() / 1000;  // 转换为 Unix 时间戳（秒）
      let endTime = this.endTimeInput === "1"
        ? Math.floor(new Date().getTime() / 1000)  // 获取当前时间戳（秒）
        : new Date(endTimeStr).getTime() / 1000;

      const data = {
        bind_status: [1],
        end_time: endTime,
        page: this.currentPage,
        page_size: this.pageSize,
        sort: 'asc',
        start_time: startTime
      };

      try {
        if(this.value1==false){  //是否使用分页功能
          data.page_size=1000
        }
        const response = await axios.post("http://console.wintoo.io/api/v4/device/device_status_list", data);
        if (response.status === 200) {
          const devices = response.data.response.data;
          this.totalCount = response.data.response.total;  // 获取数据总数
          this.devices = devices.map(item => ({
            device_register_id: item.device_register_id,
            plate_number: item.plate_number,
            district_name: item.district_name,
            last_work_time: new Date(item.last_work_time * 1000).toLocaleString(),
            upload_count: item.upload_count,
            online_time: item.online_time,
            mileage: item.mileage,
            is_uplond: item.upload_count > 0 ? "上线" : " "
          }));
        }
      } catch (error) {
        console.error("请求失败:", error);
      }
    },

    // 处理页码变化
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchData();  // 重新请求数据
    }
  },

  // 页面加载时自动调用一次 fetchData
  // mounted() {
  //   this.fetchData();
  // }
};
</script>

<style scoped>
.device-status {
  margin: 20px;
}
</style>