<template>
<section class="app-wrapper">
  <app-header />
  <section class="app-body">
    <app-side />
    <app-main />
  </section>
</section>
</template>

<script>
import { AppHeader, AppSide, AppMain } from './components'
export default {
  name: 'app-layout',
  components: {
    AppHeader,
    AppSide,
    AppMain
  }
}
</script>

<style lang="scss">
.app{
  &-wrapper{
    display: flex; flex-direction: column;
    overflow: hidden;
    height: 100%;
    background-color: $--background-color;
  }
  &-header{
    position: relative;
    height: 50px;
    color: #fff;
    background-color: $--layout-header-background-color;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  }
  &-body{
    display: flex;
    flex: 1;
    height: 0;
  }
  &-aside{
    width: 210px;
    background-color: #fff;
    box-shadow: 0 2px 8px 0 rgba(29, 35, 41, 0.05);
  }
  &-main{
    flex: 1;
  }
}
</style>
