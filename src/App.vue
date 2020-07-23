<template>
  <!-- <div v-if=authenticated id="app"> -->
  <div id="app">

    <!-- <div id="nav">
         <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
         </div> -->
    <router-view class="main" @authenticated="setAuthenticated" />

    <div v-if="authenticated" id="app">
      <router-link to="/login" v-on:click.native="logout()" replace>Logout</router-link>
      <!-- <router-view class="main" /> -->
      <nav>
        <span>
        <router-link to="/archive">
          Archive
        </router-link>
      </span>
      <span class="middle-element">
        <router-link to="/about">
          About
        </router-link>
      </span>
      <span class="middle-element">
        <router-link to="/contact">
          Contact
        </router-link>
      </span>
      <span>
        <router-link to="/random">
          Random
        </router-link>
      </span>
      </nav>
  </div>
  </div>
</template>


<script>
export default {
  name: 'App',
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: "admin",
        password: "admin"
      }
    }
  },
  mounted() {
    if(!this.authenticated) {
      console.log('catbird');
      console.log(this.authenticated);

      this.$router.replace({ path: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
      console.log('dogbird');
      console.log(this.authenticated);
    },
    logout() {
      this.authenticated = false;
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
}

#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-family: 'Alice', serif;

  nav {
    display: inline-block;
    justify-content: space-evenly;
    font-size: 30px;
    z-index: 100;
    height: 30px;
    padding-bottom: 30px;
    font-size: 17px;

    span {
      padding: 2px 5px;

      &.middle-element {
        border-left: 1px solid gray;
        border-right: 1px solid gray;
      }
    }

    a {
      color: #5b5b5b;
      text-decoration: none;
    }
  }

  .main {
    width: 100vw;
    flex: 1;
  }
}



</style>
