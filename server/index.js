/**
 * 抓包域名：cat-match.easygame2021.com
 * 抓包接口： GET /sheep/v1/game/map_info?map_id={id}
 * @author: hu-snail
 * 说明：找到抓包请求头信息 t 值 和 User-Agent值
 */
const express = require("express")
const app = express()
const axios = require('axios')
const { host, game_over_api } = require('./config')
const port = 5000 //服务器启动端口
app.all("*",function(req,res,next){
  // //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin",req.header.origin||"*")

    //允许的header类型
  res.header("Access-Control-Allow-Headers","*")

  // 跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS")

  res.header(`Cccess-Control-Allow-Credentials`,true)
  


  if(req.method=="OPTIONS"){
    res.sendStatus(200)
  }else{
    next()
  }
})

let pass_index = 0
let pass_num = 0

app.get("/pass",async function(req, res){
    pass_index++
    console.log(`第${pass_index}关准备就绪...`)
   
    try {
        const { userAgent, t, rankTime, timeType } = req.query
        if (timeType == 1) console.log(`随机生成时间${rankTime}s`)
        const resData = await axios.get(game_over_api, {
            headers: {
                "Host": host,
                "User-Agent": userAgent,
                t
            },
            params: {
                rank_score: 1,
                rank_state: 1,
                rank_time: rankTime,
                rank_role: 1,
                skin: 1
            }
        })
        const data = resData.data
        if (!data.err_code) {
            pass_num++
            console.log(`状态：第${pass_num}关已完成`)
            res.json({status: 200, data})
        } else {
            pass_num++
            console.log(`状态：第${pass_num}关失败`)
            res.json({status: 201, data: { msg: '通关失败' }})
        }
    } catch  {
        res.json({status: 202, data: { msg: '接口异常' }})
    }
})

app.listen(port,()=>{
  console.log(`后端服务地址： http://localhost:${port}`)
})
