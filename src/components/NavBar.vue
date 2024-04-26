<template>
    <div id="bar">
        <h1>justinburrill.ca</h1>
        <nav>
            <router-link to="/">Home</router-link>

            <router-link to="/test">Test</router-link>
        </nav>
    </div>
</template>

<style lang="css">
router-link {
    color: black;
}

h1 {
    font-weight: bold;
    font-size: 40px;
    margin: 10px;
    padding: 10px;
}

nav {
    text-align: right;
}

#bar {
    position: fixed;
    background-color: lightblue;
    width: 100%;
    margin: 0;
    padding: 0;

}
</style>