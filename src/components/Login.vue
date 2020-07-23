<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>


<!-- <script>
     export default {
     name: 'Login',
     data() {
     return {
     input: {
     username: "",
     password: ""
     }
     }
     },
     methods: {
     login() {
     if(this.input.username != "" && this.input.password != "") {
     if(this.input.username == "admin" && this.input.password == "admin") {
     this.$emit("authenticated", true);
     this.$router.replace({ name: "archive" });
     } else {
     console.log("The username and / or password is incorrect");
     }
     } else {
     console.log("A username and password must be present");
     }
     }
     }
     }
     </script>
-->
<script>
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';


export default 
@Component()
class Login {
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    }
  }

  login() {
    if(this.input.username != "" && this.input.password != "") {
      if(this.input.username == "admin" && this.input.password == "admin") {
        this.$emit("authenticated", true);
        this.$router.replace({ path: "Opener" });
      } else {
        console.log("The username and / or password is incorrect");
        }
    } else {
      console.log("A username and password must be present");
    }
  }
}

</script>


<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
