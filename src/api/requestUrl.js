// 统一封装所有接口路径
export default {
  url : "/asset/allocationWeightNetvalue/co",
  //各期资产配置结果
  allocationResult:"/asset/allocationWeightNetvalue/allocationResult",
  //可交易FOF组合构建-股票型
  fofRecommendStockFund:"/asset/fofRecommendStockFund",
  //可交易FOF组合构建-债券型
  fofRecommendBondFund:"/asset/fofRecommendBondFund",
  //股票历史表现
  fofHistReturnStock:"/asset/fofHistReturnStock",
  //债券历史表现
  fofHistReturnBond:"/asset/fofHistReturnBond",
  //策略风险特征pk
  resultOfRisk:"/asset/resultOfRisk",
  macroUrl : "/asset/allocationWeightNetvalue/co",
  macroIndexUrl:"/asset/allocationWeightNetvalue",
  //FOF构建
  stockFundUrl:"/asset/fofHistReturnStock",//股票型图表
  stockTableUrl:"/asset/fofRecommendStockFund", //股票型table

  bondFundUrl:"/asset/fofHistReturnBond",//债券型图表
  bondTableUrl:"/asset/fofRecommendBondFund",//债券型table
}
