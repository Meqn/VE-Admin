# Store

> 由于每个项目默认需要 `user` 和 `permission` 模块（可非必须），所以需要在项目的 store 中载入全局目录中的 `user` 和 `permission` 这两个模块（默认包含了必须的数据）。



---

🚫 废除版本

---

# store

> 为了方便管理数据，全平台只会有一个 store，但每个平台的 Store 又是不一样的。


1. 所有平台共有一个 Store
2. 全局Store 初始化时只有一个 User模块，Permission共用模块是动态创建的。
3. 每个平台会自动注册 `app/modules/` 目录下的模块
