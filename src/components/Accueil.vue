<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12 text-center">
        <h1>
          <span>Tinder</span><br />
          Movie
        </h1>
        <p>
          Inscrivez-vous,<br />
          Comparez-vous,<br />
          Découvrez-vous
        </p>
        <div class="link">
          <router-link to="/inscription" class="button" v-if="!user">
            S'inscrire</router-link
          >
          <router-link to="/connexion" class="button_2" v-if="!user">
            Se connecter</router-link
          >
          <router-link to="/SectionMovie" class="button_2" v-if="user"
            >Trouver des films</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accueil",
  data() {
    return {
      user: {},
      mobileMenu: false,
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("userData"));
  },
};
</script>

<style scoped>
.link {
  display: grid;
}
a {
  text-decoration: none;
}
p {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin-bottom:50px;
  color: #ffffff;
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
  font-size: 40px;
  line-height: 49px;
  text-align: center;
  margin-bottom:70px;
  color: #ffffff;
}
h1 span {
margin-bottom:20px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 49px;
  text-align: center;

  color: #f242eb;
}

.button {
  margin-bottom: 1rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  background: #f242eb;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  text-align: center;
  color: #ffffff;
  background: #f242eb;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 1rem;
  width: 100%;
}

.button_2 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  text-align: center;
  color: #f242eb;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 1rem;
  width: 100%;
}
</style>
