<!-- 总体监控 -->
<template>
  <div class="app-container home">
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form app-container-box">
      <el-form-item prop="lineId">
        <el-select v-model="searchForm.lineId" placeholder="全部产线" @change="getList">
          <el-option
            v-for="(item,index) in lineList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-button @click="close()">关闭socket</el-button>
      </el-form-item> -->
    </el-form>
    <div class="app-container-box">
      <el-row :gutter="20" v-for="(item2,index2) in dataList" :key="index2">
        <el-col class="item" :span="6" v-for="(item,index) in item2" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix" @click="lookDetail(item.lightId,item)">
              <span v-if="item.light">{{item.light.name}}</span>
            </div>
            <div class="text item">
              <div class="blockgroup">
                <span class="colorblock" :style="{opacity:setLight(item.lightValue,0)}"></span>
                <span class="colorblock green" :style="{opacity:setLight(item.lightValue,1)}"></span>
                <span class="colorblock orange" :style="{opacity:setLight(item.lightValue,2)}"></span>
                <span class="colorblock blue" :style="{opacity:setLight(item.lightValue,3)}"></span>
              </div>
              <div>机种</div>
              <el-divider></el-divider>
              <div class="colorgroup"></div>
              <div class="rate" v-for="(item2,index2) in item.details" :key="'rate'+index2">
                <div class="txt">
                  <span>{{item2.showName}}</span>
                  <span class="fr">
                    <span v-if="item2.showTimes">{{item2.times}}分 </span>
                    <span v-if="item2.showCount">{{item2.count}}次</span>
                    <span v-if="item2.showRate">({{item2.rate}}%)</span>
                  </span>
                </div>
                <el-progress
                  :percentage="item2.rate"
                  :color="item2.color?item2.color:'red'"
                   :show-text="false">
                </el-progress>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getLineList, getOverviewByLine } from '@/api/factory'

export default {
  name:'overview',
  components: {  },
  data() {
    return {
      searchForm:{
        lineId: undefined
      },
      dataList: [],
      listLoading: false,
      lineList: [],
      socketPath: 'ws://121.43.110.64:8081/factory/light/sync_value',
      socket: '',
      socketData : {}
    }
  },
  methods:{
    getList(){
      let param = {
        ...this.searchForm
      }
      this.listLoading = true
      getOverviewByLine(param).then(res => {
        this.listLoading = false
        if(res.code == '200'){
          this.dataList = res.data
          this.send()
        }
      }).catch(error => {
        this.listLoading = false
      })
    },
    setLight(lightValue,ix){
      //设置灯灭亮
      // 0红1绿2黄3蓝
      let op = 1
      if(lightValue){
        // 00111
        let val = lightValue.split('')
        for(let i=0;i<4;i++){
          if(ix == i && val[i] == 1){
            op = 0.2
          }
        }
      }
      return op
    },
    queryLineList(){
      // 查询线别
      let param = {
        size:-1
      }
      getLineList(param).then(res => {
        if(res.code == '200'){
          this.lineList = res.data.records
          this.lineList.unshift({name:'全部产线',id:undefined})
        }
      })
    },
    lookDetail(lightId,item){
      this.$router.push({
        path: "/home/detail",
        query: {
          lightId,
          deviceNo:item.light.deviceNo
        }
      })
    },
    init() {
      if(typeof(WebSocket) === "undefined"){
        alert("您的浏览器不支持socket")
      }else{
        // 实例化socket
        this.socket = new WebSocket(this.socketPath)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open() {
      // console.log("socket连接成功")
    },
    error() {
      // console.log("连接错误")
    },
    getMessage(msg) {
      let data = msg.data
      if(data != ''){
        this.socketData = JSON.parse(data)
        // 三色灯id-三色灯序号（0红1绿2黄3蓝）-亮灭（0亮1灭）
        // data = lightId: 10,lightIndex: 1,originIndexValue: 0
        console.log(this.socketData)
        let lightData = this.socketData.data
        let lightIndex = lightData.lightIndex
        for(let i=0;i<this.dataList.length;i++){
          for(let j=0;j<this.dataList[i].length;j++){
            if(this.dataList[i][j].lightId == lightData.lightId){
              // lightValue: "00111"
              let lightValue = this.dataList[i][j].lightValue
              let newLightValue= lightValue.substr(0,lightIndex)+lightData.originIndexValue+lightValue.substr(lightIndex+1,lightValue.length)
              this.dataList[i][j].lightValue = newLightValue
            }
          }
        }
        this.$forceUpdate()
      }
    },
    send() {
      let ids = []
      for(let i=0;i<this.dataList.length;i++){
        for(let j=0;j<this.dataList[i].length;j++){
          ids.push(this.dataList[i][j].lightId)
        }
      }
      this.socket.send(ids)
    },
    close() {
      this.socket.close()
      console.log("socket已经关闭")
    }
  },
  created(){
    this.queryLineList()
    this.getList()
    this.init()
  },
  destroyed(){
    // 销毁监听
    this.socket.onclose = this.close
  }
}
</script>

<style lang="scss">
.home{
  .box-card{
    .el-card__header{
      padding: 0 20px;
      line-height: 50px;
      cursor: pointer;
    }
    .el-divider{
      margin: 10px -20px;
      width: calc(100% + 40px);
      background-color: #e6ebf5;
    }
  }
}
</style>
<style lang="scss" scoped>
.home{
  .item{
    margin-bottom: 20px;
  }
  .box-card{
    height: 310px;
    color: #606266;
  }
  .rate {
    margin: 12px 0;
    .txt {
      margin-bottom: 4px;
      font-size: 12px;
    }
  }
  .blockgroup{
    display: flex;
    justify-content: space-around;
    margin-bottom: 8px;
    margin-top: -8px;
    .colorblock{
      flex: 1;
      display: inline-block;
      margin-right: 8px;
      width: 57px;
      height: 24px;
      background: #ff3341;
      border-radius: 4px;
      &.orange {
        background: #ff9900;
      }
      &.blue {
        background: #0d7eff;
      }
      &.green {
        background: #14cc14;
      }
    }
  }
}
</style>
