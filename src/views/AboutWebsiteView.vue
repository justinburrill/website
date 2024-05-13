<template>
  <h2>This website is built with:</h2>
  <div class="flex-container">
    <div>
      <img class="logo" src="../assets/vue-logo.png">
      <p class="img-label">Vue.js</p>
    </div>
    <div>logo2</div>
    <div>logo3</div>
    <div>logo4</div>
  </div>
  <p>This website is self-hosted on a ThinkPad running Ubuntu sever 22.04 with Apache2.</p>
</template>

<style>
* {
  font-size: 22px;
}

.flex-container {
  display: flex;
}

.flex-container>div {
  padding: 50px;
}

.img-label {
  text-align: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 25px;
}

.logo {
  height: 200px;
  width: 200px;
}
</style>