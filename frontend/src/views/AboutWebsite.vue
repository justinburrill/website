<template>
    <div class="center">
        <p>This website hosted on a ThinkPad running Ubuntu sever 22.04</p>
        <p>I used these technologies:</p>
        <div id="logo-div" class="flex-container">
            <div class="logo-box" id="vue-box">
                <img class="logo" src="../assets/vue-logo.png">
                <p class="logo-label">Vue.js</p>
            </div>
            <div class="logo-box" id="apache-box">
                <img class="logo" src="../assets/apache-logo.png">
                <!-- <p class="logo-label">Apache2</p> -->
            </div>
            <div class="logo-box" id="sass-box">
                <img class="logo" src="../assets/sass-logo.png">
                <!-- <p class="logo-label">Sass</p> -->
            </div>
            <div class="logo-box" id="pnpm-box">
                <img class="logo" src="../assets/pnpm-logo.png">

            </div>
        </div>

    </div>
</template>

<style src="../styles/AboutWebsite.sass" lang="sass" />
<script>
function loadFile(filePath) {
    // https://stackoverflow.com/questions/36921947/read-a-server-side-file-using-javascript
    let result = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath);
    xmlhttp.send();

    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    else {
        console.log("xmlhttp returned", xmlhttp.status);
        console.log("responseText:", xmlhttp.responseText);
    }
    return result;
}

let result = loadFile("http://localhost:8080/sensors.txt");
console.log(result);
</script>