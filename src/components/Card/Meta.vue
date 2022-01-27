<template>
<div class="ve-card-meta">
  <div v-if="avatar || $slots.avatar" class="ve-card-meta-avatar">
    <slot name="avatar">
      <el-avatar v-if="avatar" :src="avatar" />
    </slot>
  </div>
  <div class="ve-card-meta-detail">
    <div v-if="title || $slots.title" class="ve-card-meta-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="description || $slots.description" class="ve-card-meta-description">
      <slot name="description">{{ description }}</slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'VeCardMeta',
  props: {
    avatar: String,
    title: String,
    description: String
  }
}
</script>
