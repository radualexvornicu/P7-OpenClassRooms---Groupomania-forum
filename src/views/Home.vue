<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
      <h6>Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement
plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement
300 il y a 3 ans.</h6>
    </header>
    
    <router-view />
  </div>
 
  
</template>

<script>
import UserService from '../services/user.service';


export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>