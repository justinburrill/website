<template>
  <h2>This website is built with:</h2>
  <div class="flex-container">
    <div><img src="../assets/logo.png"></div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
  <h2>This website is hosted on:</h2>
  <p>apache2</p>
</template>

<style>
.flex-container {
  display: flex;
  background-color: lightgrey;
}

.flex-container>div {
  padding: 50px;
}

img {
  height: 200px;
  width: 200px;
}
</style>