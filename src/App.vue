<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  html,
  body{
    font-size: 16px;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
  }
  input {
    outline:none;
    border:  0;
  }
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #eaeaea;
    font-size: 16px;
    height: 100%;
    width: 100%;
  }

  @media screen and (min-width: 450px) {
    #app {
      position: relative;
      width: 420px;
      height: 650px;
      top: 50%;
      margin: -325px auto 0 auto;
    }
  }
</style>
