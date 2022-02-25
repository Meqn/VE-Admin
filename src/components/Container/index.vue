<template>
<div class="ve-container">
  <div v-if="$slots.header" :class="['ve-container-head', headClass]" :style="headStyle">
    <slot name="header" />
  </div>
  <div :class="['ve-container-main', bodyClass]" :style="bodyStyle">
    <slot />
  </div>
  <div v-if="$slots.footer" :class="['ve-container-foot', footClass]" :style="footStyle">
    <slot name="footer" />
  </div>
</div>
</template>

<script>
export default {
  name: 'VeContainer',
  props: {
    headStyle: [String, Object],
    headClass: String,
    bodyStyle: [String, Object],
    bodyClass: String,
    footStyle: [String, Object],
    footClass: String
  }
}
</script>

<style lang="scss">
.ve-container{
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;
  
  &-main{
    position: relative;
    flex: 1;
    overflow: auto;
    min-height: 0;
    padding: 20px;
    overflow-x: hidden;

    .ve-page-header{
      margin: -20px -20px 20px;
    }
  }
  &-head, &-foot{
    position: relative;
    z-index: 1;
  }
  &-head{
    box-shadow: 2px 0 12px rgba(0, 0, 0, .1);
  }
  &-foot{
    padding: 16px 20px;
    background-color: #fff;
    box-shadow: 0 -6px 16px -8px rgba($color: #000000, $alpha: 0.1);
  }
}
</style>
