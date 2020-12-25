<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{userName.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{userName.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{userName.email}}
    </p>
    <p>
      <strong>Created At:</strong>
      {{userName.createdAt | moment("DD MMM YYYY")}}
    </p>
   
    <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
                <button v-show="!submitted" @click="deleteUserReq();" class="btn btn-danger m-1 p-1">Delete</button>
                <router-link :to="'/admin'" class="btn btn-success m-1 p-1">Back</router-link>
                <div v-show="submitted">
                 <h5 class="text-danger">Are you sure you what to submit Delete?</h5>
                     
                   <button @click="deleteUser(userName.id);" class="btn btn-danger m-1 p-1">Submit Delete</button> 
                </div>
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <router-link :to="'/mod'" class="btn btn-success m-1 p-1">Back</router-link>
              </div>
              <div v-default>
                <router-link :to="'/user'" class="btn btn-success m-1 p-1">Back</router-link>
              </div>
            </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
const user = JSON.parse(localStorage.getItem("user"));
export default {
name: "profile-view",
  data() {
    return {
      role: "",
    userName: {
    id: null,
    username: "",
    email: "",
    createdAt: ""
  },
  deleteReqToken: "", 
  submitted: false,
  ReqToken : null,
      
    };
  },
  methods: {
    getUserName(id){
    UserService.getUserName(id)
    .then((response) => {
      this.userName = response.data;
      console.log(this.userName, "user profile");
    }).catch((e) => {
        console.log(e);
      });
},
deleteUserReq(){
     
    this.submitted = true;
  
},
  deleteUser(id){
  var r = confirm("Press a button!");
    if (r == true) {
      console.log("You pressed OK!");
      var r2 = confirm("Press a button AGAIN!");
      if (r2 == true) {
        console.log("You pressed OK AGAIN!");
      UserService.delete(id)
  .then((response) =>{
    console.log(response.data);
  })
      .catch((e) => {
        console.log(e);
      });
      }else {
      console.log("You pressed ABORTED!");
      this.submitted = false;
          }
    } else {
      console.log("You pressed CANCEL!");
      this.submitted = false;
      this.$router.push('/admin');
    }
  
},
  },
  mounted() {
    this.role = user.roles[0];
    console.log(this.role);
    this.getUserName(this.$route.params.id);
  }
};
</script>