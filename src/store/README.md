# store

> 为了方便管理数据，全平台只会有一个 store，但每个平台的 Store 又是不一样的。


1. 所有平台共有一个 Store
2. 全局Store 初始化时只有一个 User模块，Permission共用模块是动态创建的。
3. 每个平台会自动注册 `app/modules/` 目录下的模块
