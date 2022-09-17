
<template>
    <Layout>
      <div class="res-container">
        <div class="content">
          <h4 class="res-title">结果打印</h4>
          <div class="res-body">
            <p class="item" v-if="formInline.loading">正在执行第 <span class="index">{{formInline.index}}</span> 次通过 </p>
            <p class="item" v-else>共计：通过<span class="success">{{formInline.passNum}}</span> 次， 失败<span class="error">{{formInline.unpassNum}}</span>次</p>
            <p class="item">已通关：<span class="success">{{formInline.passNum}}</span>次</p>
            <p class="item">失败次数：<span class="error">{{formInline.unpassNum}}</span>次</p>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <el-alert
          title="请勿使用本程序恶意对游戏服务器持续造成压力及商用，一切后果自负！！！"
          type="warning"
          class="tip"
          :closable="false"
          show-icon>
        </el-alert>
        <el-alert
          class="tip"
          show-icon
          title="按照抓包信息填写，点击立即通关即可加入羊群,通关次数限制为10次，切勿恶意测试！！！"
          type="info">
        </el-alert>
        <p class="msg">工具推荐：Fiddler/HTTPDebugger/Charles【PC】、HttpCarry【Android】、Stream【iphone】</p>
         <el-form ref="ruleForm" :model="formInline" label-position="left"  label-width="150px">
          <el-form-item label="t" prop="t">
            <el-input v-model="formInline.t"  :rows="5" type="textarea" placeholder="请输入抓包信息t"></el-input>
          </el-form-item>
          <el-form-item label="userAgent" prop="userAgent">
            <el-input v-model="formInline.userAgent"  :rows="4" type="textarea" placeholder="请输入抓包信息userAgent"></el-input>
          </el-form-item>
          <el-form-item label="通关次数" prop="num">
            <el-input-number v-model="formInline.num" :min="1" :max="10"  label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="时间方式" prop="timeType">
            <el-radio-group v-model="formInline.timeType">
              <el-radio :label="1">随机</el-radio>
              <el-radio :label="2">自定义</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="通关时间" prop="num" v-if="formInline.timeType === 2">
            <el-input-number v-model="formInline.rankTime" :min="60"  label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="success" :loading="formInline.loading" icon="el-icon-thumb" @click="getPass">
              {{formInline.loading ? '正在通关' : '立即通关'}}
            </el-button>
            <el-button type="danger" icon="el-icon-close" @click="handlerUnPass">
             结束通关
            </el-button>
          </el-form-item>
        </el-form>
       
      </div>
    </Layout>
</template>

<script>
import Layout from './layout'
import { getPassApi } from '@/api'
export default {
  name: 'App',
  components: {
    Layout
  },
  data() {
    return {
      formInline: {
        t: '',
        userAgent: '',
        rankTime: 60, // 单位秒
        num: 10,
        passNum: 0,
        unpassNum: 0,
        index: 0,
        loading: false,
        timeType: 1
      },
      timer: null,
    }
  },
  watch: {
    formInline: {
      handler(item) {
        const isPass = item.num === item.index
        if (isPass) {
          this.formInline.loading = false
          this.$message.success('已经全部完成')
          clearInterval(this.timer)
          this.timer = null
        } else {
          this.formInline.loading = false
        }
      }
    }
  },
  methods: {
    handleCloseUpload() {
      this.fileList = []
    },
    toGithub() {
      window.open('https://github.com/hu-snail/vue-upload-oss')
    },
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) return
        })
    },

    handlerUnPass() {
      this.formInline.loading = false
      window.clearInterval(this.timer)
      this.timer = null
    },

    async onDoPass() {
      
      let { num, passNum, unpassNum, index, userAgent, t, rankTime, timeType } = this.formInline
      if (parseInt(passNum + unpassNum) >= num) {
        this.formInline.loading = false
        this.$message.success( `执行完毕,通关${passNum}次，失败${unpassNum}次`)
        window.clearInterval(this.timer)
        this.timer = null
        return
      }
      if (index < num) {
        this.formInline.index ++
        let time = null
        if (timeType === 1) time =(Math.floor(Math.random() * 10) + 3) * (Math.floor(Math.random() * 30) + 20)
        else time = rankTime
        await getPassApi({
          userAgent,
          t,
          rankTime: time,
          timeType
        }).then(() => {
          this.formInline.passNum ++
        }).catch(() => {
          this.formInline.unpassNum ++
        })
      }
    },

   getPass() {
      this.formInline.loading = true
      this.formInline.index ++
      this.formInline.passNum = this.formInline.unpassNum = this.formInline.index = 0

      this.timer = window.setInterval(this.onDoPass, 3 * 1000);
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  margin: 20px 0;
  width: 650px;
}
.res-container {
  width: 280px;
  margin: 20px 15px;
  .content {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
  }
  .res-body {
    padding: 10px 0;
    .item {
      padding: 5px 0;
      border-bottom: 1px dashed #ccc;
    }
  }
}
.msg {
  font-size: 13px;
  color: #666;
  padding: 10px;
  border-left: 2px solid #666;
  background-color: #f5f5f5;
  margin-bottom: 20px;
}
.tip {
  margin-bottom: 20px;
}
.form-wrapper {
  width: 500px;
  margin: 25px auto;

  .alert {
    margin-bottom: 10px;
  }
}
.index {
  color: blueviolet;
  font-size: 18px;
  font-weight: 500;
  padding: 0 10px;
}
.success {
  color: green;
  font-size: 18px;
  font-weight: 500;
  padding: 0 10px;
}
.error {
  color: #f45;
  font-size: 18px;
  font-weight: 500;
  padding: 0 10px;
}
</style>