# SelectFilter

## props
- `value`: [Number, String, Array],
- `data`: Array,
- `immediate`: Boolean, // 是否立即执行 (默认有值，可用于编辑状态)
- `type`: String, ['', 'demo', 'project', 'company']
- `name`: String,
- `multiple`: Boolean,
- `collapseTags`: Boolean,
- `multipleLimit`: Number,
- `clearable`: Boolean
- `filterable`: Boolean
- `remote`: Boolean,
- `query`: Object, // 附加查询条件
- `placeholder`: String,
- `size`: String,
- `filterList`: Array // 添加过滤值，获取的列表自动过滤这些值的选项

## slots
- `default`

## event
- `change(value, index: Number)`: 选中值发生变化时触发
- `remove-tag(value)`: 多选模式下移除tag时触发
- `clear`
- `focus`


## example

```html
<AppSelectFilter type="project" remote v-model="form.project_name" placeholder="请选择项目" :query="{ company_id: 12 }" />

<AppSelectFilter type="demo" v-model="form.name" placeholder="演示本地数据" />

<AppSelectFilter v-model="form.type" placeholder="请选择类型" :data="[{ name: '危大工程', value: 1 }]" />
```



## template

```html
<template>
  <el-select
    v-if="remote && !data"
    v-model="val"
    :placeholder="placeholder"
    :size="size"
    :remote-method="queryList"
    :remote="remote"
    :multiple="multiple"
    :loading="loading"
    :filterable="filterable"
    :clearable="clearable"
    @focus="onFocus"
    @clear="onClear"
    @change="onChange">
    <el-option v-for="item in list" :key="item.value" :label="item.name" :value="item.value">
      <slot v-bind="{ item }" />
    </el-option>
  </el-select>

  <el-select
    v-else
    v-model="val"
    :placeholder="placeholder"
    :size="size"
    :loading="loading"
    :filterable="filterable"
    :clearable="clearable"
    @change="onChange">
    <el-option v-for="item in list" :key="item.value" :label="item.name" :value="item.value">
      <slot v-bind="{ item }" />
    </el-option>
  </el-select>
</template>
```

