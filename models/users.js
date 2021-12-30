var mongoose = require("./db");
// 用户的表结构对象
var userSchema = new mongoose.Schema({
  username:String,
  password:String
});
// 创建模型类并导出
module.exports = mongoose.model("users", userSchema);
