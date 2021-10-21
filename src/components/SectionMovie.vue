<template>
<div class="container">
    <div class="row">
     <h1><span>Tinder</span> Movie</h1>
     <h2>Ajoutez des films à votre liste</h2>
        <div v-if="donnees" class="col-12 text-center">
        <img v-bind:src="img" alt="">
        <h2>{{donnees.original_title}}</h2>
        </div>
    </div>
    <div class="col-12 text-center">
    <button id="position" class="buttonMovie refus" v-on:click="searchMovie">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.385 10.5L18 15.885L12.615 10.5L10.5 12.615L15.885 18L10.5 23.385L12.615 25.5L18 20.115L23.385 25.5L25.5 23.385L20.115 18L25.5 12.615L23.385 10.5Z" fill="#F8F8F8"/>
    </svg>

</button>
<button id="position" class="buttonMovie ajout" v-on:click="validMovie(donnees)">
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.3113 10.5613C23.6106 10.2763 24.0089 10.1187 24.4222 10.1218C24.8355 10.125 25.2315 10.2885 25.5264 10.578C25.8214 10.8675 25.9924 11.2603 26.0034 11.6734C26.0143 12.0866 25.8643 12.4878 25.585 12.7925L17.1062 23.3963C16.9605 23.5533 16.7845 23.6793 16.5889 23.7668C16.3933 23.8543 16.182 23.9014 15.9678 23.9054C15.7535 23.9093 15.5407 23.87 15.342 23.7899C15.1433 23.7097 14.9628 23.5903 14.8112 23.4388L9.1885 17.816C9.03191 17.6701 8.90632 17.4941 8.81921 17.2986C8.73211 17.1031 8.68527 16.8921 8.68149 16.6781C8.67772 16.4641 8.71708 16.2516 8.79724 16.0531C8.8774 15.8547 8.9967 15.6744 9.14804 15.523C9.29938 15.3717 9.47965 15.2524 9.6781 15.1722C9.87655 15.0921 10.0891 15.0527 10.3031 15.0565C10.5171 15.0603 10.7281 15.1071 10.9236 15.1942C11.1191 15.2813 11.2951 15.4069 11.441 15.5635L15.8907 20.0111L23.2709 10.608C23.2842 10.5916 23.2984 10.576 23.3134 10.5613H23.3113Z" fill="#F8F8F8"/>
    </svg>
</button>
      <headerBottom></headerBottom>
    </div>





</div>
</template>

<script>
import axios from 'axios'
import headerBottom from './headerBottom'
    export default {
        name :'SectionMovie',
        components: {
    headerBottom
  },
        data(){
            return{
                requete : '',
                donnees: undefined,
                img : '',
                api_code: '6d66e3921e47371553f7d0c5082f0f29',
                url_recherche : 'https://api.themoviedb.org/3/movie/',
                filmEnregistre: JSON.parse(window.localStorage.getItem('filmEnregistre'))
            }
        },
        methods:{
            searchMovie(){
                
                const random = Math.floor(Math.random() * 600000);
                axios
                .get(`${this.url_recherche}${random}?api_key=${this.api_code}`)
                .then(response =>{
                        this.donnees = response.data
                        console.log(response.data)
                        this.img = `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`
                        
                    })

            },

            async validMovie(item){
                if(window.localStorage.getItem('userData')) {
                        console.log(item)
                         var nomDuFilm = item.original_title
                         var ListeFilms = 'test'
                         var identifiantFilm = item.id
                         console.log(identifiantFilm)
                         var user_id = JSON.parse(window.localStorage.getItem('userData')).id
                        console.log(item.original_title)
                        let bookmarkItem
                        if(this.filmEnregistre.findIndex(recipe => recipe.nomDuFilm === item.original_title) === -1){
                            bookmarkItem = {
                                nomDuFilm:nomDuFilm,
                                ListeFilms,
                                identifiantFilm,
                                users_permissions_users: user_id
                            }
                            this.filmEnregistre.push(bookmarkItem)
                            //set to localstorage
                            window.localStorage.setItem('filmEnregistre', JSON.stringify(this.filmEnregistre))
                            await axios.post(`https://oska-tinderback.herokuapp.com/bookmarks`, {
                                nomDuFilm:nomDuFilm,
                                identifiantFilm:identifiantFilm,
                                users_permissions_users: user_id
                               
                            }, 
                            {
                                headers: {
                                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                                },
                            })
                            const res =  await axios.get(`https://oska-tinderback.herokuapp.com/users/${user_id}`, {
                                headers: {
                                    Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
                                }
                            })
                            const user  = res.data
                            
                            window.localStorage.setItem('userData', JSON.stringify(user))
                            window.localStorage.setItem('filmEnregistre', JSON.stringify(user.bookmarks))
                           
                        }
                }

                this.searchMovie()
            }
            },
            beforeMount(){
                this.searchMovie()
            }
    }
</script>

<style>
.container img{
    width:75%;
    height:auto;
    border-radius:20px
}
h2{
text-align:center;

font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 20px;
margin-top:0.5rem;
/* identical to box height */

color: #FFFFFF;


}

h1 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  
  text-align: left;
  margin-bottom:1rem;
  color: #ffffff;
}
h1 span {
margin-bottom:20px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 30;
  color: #f242eb;
}

.buttonMovie{
width:60px;
height:60px;
border-radius:50%;
border:none;
margin:0 1rem;



}
.refus{
    background: #BD2B45;
}
.ajout{
    background:#2BBD54;
}
</style>