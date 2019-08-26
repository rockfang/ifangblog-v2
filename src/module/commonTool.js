let commonTool = {
  checkNum: function(input) {
    let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
    return re.test(input)
  },
};
export default commonTool;
