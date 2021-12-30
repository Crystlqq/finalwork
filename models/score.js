var mongoose = require("./db");
// 用户的表结构对象
var scoreSchema = new mongoose.Schema({
  Sno: Number, //学号
  Sname: String, //姓名
  machine_learning: Number, //计算机网络
  nodejs: Number, //web前端开发
  microservice: Number, //云计算与云服务
  rstudio: Number, //计算机视觉
  system_safety: Number, //数据结构
});
// 创建模型类并导出
module.exports = mongoose.model("Score", scoreSchema);
