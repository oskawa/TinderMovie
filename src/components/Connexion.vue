<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12">
        
          <div class="lienRenvoi">
            <router-link to="/Inscription"> Inscription </router-link>
          </div>

          <h1 class="font-bold text-left font-montserrat text-4xl sm:text-6xl mb-10">
            Connexion
          </h1>
          <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
          <form @submit="login">
            
              
              <input
                type="email"
                v-model="email"
                placeholder="E-mail"
                class=""
              />
            
              
              <input
                type="password"
                placeholder="Mot de passe"
                v-model="password"
                class=""
              />
            

            <button
              type="submit"
              :disabled="password.length < 3"
              class="bg-green-400 p-5 text-white"
            >
              Se connecter
            </button>
            <p class="text-end">
              <router-link to="/forgotpassword">Forgot Password?</router-link>
            </p>
          </form>
       
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMsg: `An error occurred, please try again`,
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      try {
        const res = await axios.post(`https://oska-tinderback.herokuapp.com/auth/local`, {
          identifier: this.email,
          password: this.password,
        });

        const { jwt, user } = res.data;
        window.localStorage.setItem("jwt", jwt);
        window.localStorage.setItem("userData", JSON.stringify(user));
        window.localStorage.setItem("filmEnregistre", JSON.stringify(user.bookmarks));
        this.$router.push("/");
      } catch (error) {
        this.error = true;
        this.password = "";
      }
    },
  },
};
</script>
<style scoped>
.text-end a{
    text-decoration:none;
    color:white;
}
.lienRenvoi {
  margin-bottom: 1rem;
}
.lienRenvoi a {
  text-decoration: none;
  color: white;
}
.container {
  height: 100vh;
}
.row {
  height: 100%;
}
h1 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;

  color: #fff;
}
input {
  border-radius: 20px;
  background-color: #e5e5e596;
  border: none;
  width: 100%;
  padding: 1rem 0.5rem;
  margin-bottom: 1rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height:32px;
}
button {
  width: 100%;
  background-color: #f242eb;
  border: none;
  border-radius: 20px;
  padding: 1rem 0;
  color: white;
}
button:disabled {
  opacity: 0.5;
}
</style>
