<template>
    <div id="bar">
        <h1>justinburrill.ca</h1>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about-this-website">Test</router-link>
        </nav>
    </div>
</template>

<style>
a {
    font-size: 35px;
    color: black;
    padding: 3em;
}

h1 {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, serif;
    font-weight: bold;
    font-size: 45px;
    margin: 10px;
    padding: 10px;
    margin-left: 40px;
    vertical-align: middle;
}

nav {
    position: inherit;
}

#bar {
    position: fixed;
    background-color: lightblue;
    width: 100%;
    height: 150px;
    margin: 0;
    padding: 0;

}
</style>