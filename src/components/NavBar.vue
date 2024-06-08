<template>
    <div id="bar">
        <nav>
            <router-link to="/" id="title">justinburrill.ca</router-link>
            <router-link to="/about-this-website">About this website</router-link>
            <router-link to="/interactive-projects">Interactive projects</router-link>
        </nav>
        <a href="https://github.com/justinburrill" id="github" target="_blank" rel="noopener noreferrer">
            <img src="../assets/github-svgrepo-com.svg" height="40px" width="40px">
        </a>
    </div>
</template>

<style>
a {
    font-size: 25px;
    color: black;
    padding: 1em;
    line-height: 90px;
    text-decoration: none;
}

router-link {
    vertical-align: middle;
}

nav {
    position: inherit;
}

#github {
    display: flex;
    justify-content: flex-end;
}

#title {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, serif;
    font-weight: bold;
    font-size: 45px;
    padding-left: 60px;
    text-decoration: underline;
}

#bar {
    position: fixed;
    align-items: center;
    background-color: lightblue;
    width: 100%;
    height: 90px;
    margin: 0;
    padding: 0;

}
</style>