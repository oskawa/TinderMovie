<template>
  <div class="container">
    <div class="row">
      <h1><span>Tinder</span> Movie</h1>
      <h2>Entrez un nom d'utilisateur pour comparer votre liste</h2>
      <div class="col-12">
      <div class="recherche">
      <input type="text" v-model="pseudo" /><button v-on:click="searchUser">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.545 15.467L13.766 11.688C14.3551 10.7211 14.6659 9.61028 14.664 8.47801C14.664 5.06101 11.703 2.10101 8.28601 2.10101C7.47361 2.10088 6.66915 2.2608 5.91857 2.57163C5.16799 2.88246 4.486 3.33811 3.91155 3.91256C3.3371 4.48701 2.88145 5.169 2.57062 5.91958C2.25979 6.67016 2.09987 7.47462 2.10001 8.28701C2.10001 11.703 5.06101 14.664 8.47701 14.664C9.57196 14.665 10.6473 14.3736 11.592 13.82L15.391 17.621C15.5697 17.7992 15.8117 17.8993 16.064 17.8993C16.3163 17.8993 16.5584 17.7992 16.737 17.621L17.68 16.678C18.051 16.307 17.916 15.838 17.545 15.467ZM4.00401 8.28701C4.00388 7.72461 4.11454 7.16769 4.32967 6.64806C4.5448 6.12842 4.86019 5.65626 5.25782 5.25854C5.65546 4.86081 6.12754 4.54531 6.64712 4.33006C7.16671 4.1148 7.7236 4.00401 8.28601 4.00401C10.652 4.00401 12.76 6.11101 12.76 8.47801C12.7597 9.61385 12.3084 10.7031 11.5053 11.5063C10.7021 12.3094 9.61285 12.7607 8.47701 12.761C6.11101 12.76 4.00401 10.652 4.00401 8.28701V8.28701Z" fill="#333333"/>
</svg>
</button>
</div>

      <ul class="filmsCommuns">
        <li v-for="movie in showMovie" :key="movie.identifiantFilm">
          <img
            v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.moviePoster"
            alt=""
          />
          <h2>{{ movie.movieTitle }}</h2>
        </li>
      </ul>
      </div>
    </div>
    <headerBottom></headerBottom>
  </div>
  
</template>


<script>
import axios from "axios";
import headerBottom from './headerBottom'
export default {
  name:"sectioncomparaison",
  components: {
    headerBottom
  },
  data() {
    return {
      user: {},
      pseudo: "",
      tabs: undefined,
      api_code: "6d66e3921e47371553f7d0c5082f0f29",
      url_recherche: "https://api.themoviedb.org/3/movie/",
      showMovie: [],
    };
  },
  methods: {
    async searchUser() {
      let array1 = [];
      let array2 = [];
      let filteredArray = [];

      await axios
      .get("https://oska-tinderback.herokuapp.com/users")
      .then((response) => {
        this.tabs = response.data.filter((b) => b.username === this.pseudo);

        if (this.tabs) {
          this.tabs[0].bookmarks.forEach((element) =>
            array1.push(element.identifiantFilm)
          );
        }
      }),
        await axios
          .get(`https://oska-tinderback.herokuapp.com/users/${this.user.id}`)
          .then((response) => {
            response.data.bookmarks.forEach((element) =>
              array2.push(element.identifiantFilm)
            );
          });

      filteredArray = await array2.filter((value) => array1.includes(value));
      console.log(filteredArray);

      if (filteredArray) {
        for (let i = 0; i < filteredArray.length; i++) {
          await axios
            .get(`${this.url_recherche}${filteredArray[i]}?api_key=${this.api_code}`)
            .then((response) => {
              var movieTitle = response.data.original_title;
              var moviePoster = response.data.poster_path;
              this.showMovie.push({ movieTitle, moviePoster });
            });
        }
      }
    },
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("userData"));
  },
};
</script>

<style>
.recherche{
    height:3rem;
}
input{
    border-radius: 20px 0 0 20px;
  background-color: #e5e5e596;
  border: none;
  width: 80%;
  padding: 1rem 0.5rem;
  height:100%;
  
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
}
button{
    width:20%;
    border:none;

    height:100%;
}
ul.filmsCommuns{
   
   
    width:100%;
    list-style:none;
}
ul.filmsCommuns li img{
    width:100px;


}
ul.filmsCommuns li h2{
    margin-left:1rem;
}
ul.filmsCommuns li{
    width:100%;
    display:inline-flex;
    margin-top:1rem;
}
</style>
