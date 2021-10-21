<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12" style="">
        
          <div class="lienRenvoi">
            <router-link to="/Connexion"> Se connecter </router-link>
          </div>
          <h1 class="">Inscrivez-vous pour partager vos expériences</h1>
          <p v-show="error" class="">{{ errorMsg }}</p>
          <form @submit="register">
            <div class="">
              <input type="text" placeholder="Prénom" v-model="name" class="" />
            </div>
            <div class="">
              <input type="email" placeholder="E-mail" v-model="email" class="" />
            </div>
            <div class="">
              <input
                type="password"
                placeholder="Mot de passe"
                v-model="password"
                class=""
              />
            </div>
            <div class="">
              <input type="text" placeholder="Pseudo" v-model="username" class="" />
            </div>

            <button
              type="submit"
              :disabled="name.length < 6 || password.length < 6 || username.length < 3"
              class=""
            >
              S'inscrire
            </button>
          </form>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      username: "",
      error: false,
      errorMsg: `Veuillez vérifier vos informations`,
    };
  },
  methods: {
    async register(e) {
      try {
        e.preventDefault();
        await axios.post(`https://oska-tinderback.herokuapp.com/auth/local/register`, {
          name: this.name,
          password: this.password,
          email: this.email,
          username: this.username,
        });
        this.$router.push("Connexion");
      } catch (e) {
        this.error = true;
        this.email = "";
      }
    },
  },
};
</script>

<style scoped>
.lienRenvoi{
   
    margin-bottom:1rem;
}
.lienRenvoi a {
     text-decoration:none;
    color:white;

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
}
button {
  width: 100%;
  background-color: #f242eb;
  border: none;
  border-radius: 20px;
  padding: 1rem 0;
  color: white;
}
button:disabled{
    opacity:0.5;
}
</style>
