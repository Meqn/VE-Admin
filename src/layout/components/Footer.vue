<template>
  <el-footer height="auto">
    <div class="ve-layout-footer">
      <slot>
        <div class="ve-layout-footer-links" v-if="links && links.length > 0">
          <template v-for="item in links">
            <a
              v-if="item.href"
              class="link-item"
              :key="item.key || item.href"
              :href="item.href"
              :title="item.key"
              :target="item.blankTarget ? '_blank' : '_self'">
              {{ item.title }}
            </a>
            <span v-else class="link-item" :key="item.key" :title="item.title">{{ item.title }}</span>
          </template>
        </div>
        <div class="ve-layout-footer-copyright">
          Copyright @ {{ copyright }}
        </div>
      </slot>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: 'LayoutFooter',
  props: {
    copyright: String,
    links: Array
  }
}
</script>
