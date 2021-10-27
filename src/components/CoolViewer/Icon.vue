<template>
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <template v-if="name === 'close'">
    <path d="M8 8l32 32M8 40L40 8" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </template>
  <template v-if="name === 'left'">
    <path d="M5.799 24h36m-24 12l-12-12 12-12" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </template>
  <template v-if="name === 'right'">
    <path d="M42 24H6M30 12l12 12-12 12" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </template>
  <template v-if="name === 'grid'">
    <path d="M39.3 6H8.7A2.7 2.7 0 006 8.7v30.6A2.7 2.7 0 008.7 42h30.6a2.7 2.7 0 002.7-2.7V8.7A2.7 2.7 0 0039.3 6z" stroke="currentColor" stroke-width="4" />
    <path d="M18 6v36M30 6v36M6 18h36M6 30h36" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
  </template>
  <template v-if="name === 'play'">
    <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
    <path d="M20 24v-6.928l6 3.464L32 24l-6 3.464-6 3.464V24z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
  </template>
  <template v-if="name === 'pause'">
    <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
    <path d="M19 18v12M29 18v12" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </template>
  <template v-if="name === 'fullscreen'">
    <path d="M33 6h9v9M42 33v9h-9M15 42H6v-9M6 15V6h9" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </template>
  <template v-if="name === 'offscreen'">
    <path d="M33 6v9h9M15 6v9H6M15 42v-9H6M33 42v-9h8.9" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </template>
  <template v-if="name === 'rotate-left'">
    <path d="M11.272 36.728A17.943 17.943 0 0024 42c9.941 0 18-8.059 18-18S33.941 6 24 6c-4.97 0-9.47 2.015-12.728 5.272C9.614 12.93 6 17 6 17" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6 9v8h8" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </template>
  <template v-if="name === 'rotate-right'">
    <path d="M36.728 36.728A17.943 17.943 0 0124 42c-9.941 0-18-8.059-18-18S14.059 6 24 6c4.97 0 9.47 2.015 12.728 5.272C38.386 12.93 42 17 42 17" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M42 8v9h-9" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </template>
</svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String
  }
}
</script>
