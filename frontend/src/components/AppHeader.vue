<template>
    <nav :class="'navbar navbar-expand-lg navbar-light' + darkModeClass">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{title}}</a>
      <button align="right" class="btn btn-outline-success" @click="darkMode()">Dark Mode</button>
  </div>
</nav>
</template>
<script>

export default {
    name: 'appHeader',
    props: {
        title: {
          type: String 
        }
    },
    data () {
        return {
            mode: 'info',
            darkModeClass: 'bg-light'
        }
    },
    methods: {
      darkMode() {
        let element = document.body;
        element.classList.toggle("dark-mode");
        this.darkModeClass = 'bg-dark'
      }
    }
}
</script>
