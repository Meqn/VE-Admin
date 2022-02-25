<template>
<div :class="['ve-page-header', { 'has-footer': hasFooter }, { 'is-ghost': ghost }]">
  <slot name="breadcrumb">
    <el-breadcrumb
      v-if="breadcrumbProps && breadcrumbRoutes.length > 0"
      :separator="breadcrumbProps.separator"
      :separator-class="breadcrumbProps.separatorClass"
      class="page-header-breadcrumb">
      <el-breadcrumb-item
        v-for="(route, i) in breadcrumbRoutes"
        :key="i"
        :replace="!!route.route"
        :to="{ path: route.path }">
        {{ route.text }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </slot>
  <div class="flex-middle page-header-heading">
    <div class="flex-middle page-header-left">
      <slot name="back">
        <div v-if="backProps" class="flex-middle page-back" @click.native="onBack">
          <i :class="[backProps.icon, 'back-icon']"></i>
          <span v-if="backProps.text" class="back-text">{{ backProps.text }}</span>
        </div>
      </slot>
      <slot name="title">
        <span class="page-title">{{ title }}</span>
        <span class="page-subtitle">{{ subTitle }}</span>
      </slot>
    </div>
    <div v-if="$slots.extra" class="page-header-extra">
      <slot name="extra" />
    </div>
  </div>
  <div v-if="$slots.default" class="page-header-content">
    <slot />
  </div>
  <div class="page-header-footer" v-if="hasFooter">
    <template v-if="tabList.length > 0">
      <el-tabs class="page-header-tab" v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane v-for="tab in tabList" :key="tab.name" :label="tab.label" :name="tab.name">
          <template #label v-if="tab.slot"><slot :name="tab.slot" /></template>
        </el-tab-pane>
      </el-tabs>
      <div class="page-header-tab-extra" v-if="$slots.tabExtra">
        <slot name="tabExtra"></slot>
      </div>
    </template>
    <slot v-else name="footer" />
  </div>
</div>
</template>
