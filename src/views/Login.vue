<template>
    <div>
        login
    </div>
    <div class="background"></div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style lang="scss" scoped>
.background{
    position: absolute;
    width: 55%;
    height: 100vh;
    right: 0;
    top: 0;
    background: #2b2b2b;
    z-index: -1;
    transform: skewX(-15deg) translateX(120px);
}
</style>