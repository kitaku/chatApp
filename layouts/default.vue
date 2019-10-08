<template>
  <div>
    <myHeader />
    <nuxt />
    <myFooter />
  </div>
</template>

<script>
 import myHeader from '../components/layouts/header.vue'
 import myFooter from '../components/layouts/footer.vue'

  export default{
    name: 'default',
    components : {
      myHeader,
      myFooter,
    }
  }
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
