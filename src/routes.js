import Accueil from './components/Accueil'
import Connexion from './components/Connexion'
import Inscription from './components/Inscription'
import SectionComparaison from './components/SectionComparaison'
import SectionMovie from './components/SectionMovie'
import SectionUser from './components/SectionUser'

export default[
    {path:'/',component:Accueil},
    {path:'/inscription',component:Inscription},
    {path:'/SectionComparaison',component:SectionComparaison},
    {path:'/SectionMovie',component:SectionMovie}, 
    {path:'/SectionUser',component:SectionUser}, 
    {path:'/Connexion',component:Connexion}, 
]

