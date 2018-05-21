<template>
  <div id="app">
  	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
dl,
dt,
dd,
ul,
ol,
li,
th,
td,
pre,
form,
input,
button,
legend,
fieldset,
textarea,
blockquote{margin:0;padding:0;}
body{
	background-color: #F7F7F7;
}
#app {
  font-family: 'Avenir',Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>