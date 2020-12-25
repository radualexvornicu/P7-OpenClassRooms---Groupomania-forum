<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
    <button v-show="!editAccount" @click="editAccount=true" class="btn btn-primary m-1 p-1" >
      Edit Account
    </button>
    <div v-show="editAccount">
      <div class="form-group">
              <label for="AccountEdit">Enter new Account Details</label>
              <input
                type="text"
                class="form-control"
                id="username"
                required
                v-model="currentUser.username"
                name="username"
              />
               <input
                type="text"
                class="form-control"
                id="email"
                required
                v-model="currentUser.email"
                name="email"
              />
            </div>            
            <button @click=" saveProfile();" class="btn btn-success m-1 p-0">
              Submit
            </button>
            <button @click="editAccount=false" class="btn btn-danger m-1 p-0">
              Cancel
            </button>
    </div>
    <div v-show="!editAccount">
<button v-show="!submitted" @click="deleteUserReq();" class="btn btn-danger m-1 p-1">
      Delete</button>
      <div v-show="submitted">
                 <h5 class="text-danger">Are you sure you what to submit Delete?</h5>
                     
                   <button @click="deleteUser(currentUser.id);" class="btn btn-danger m-1 p-1">Submit Delete</button> 
                </div>
    <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
                
                <router-link :to="'/admin'" class="btn btn-success m-1 p-1">Back</router-link>
                
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <router-link :to="'/mod'" class="btn btn-success m-1 p-1">Back</router-link>
              </div>
              <div v-default>
                <router-link :to="'/user'" class="btn btn-success m-1 p-1">Back</router-link>
              </div>
            </div>
    </div>
    
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: 'Profile',
  data() {
    return {
      role: "",
      editAccount: false,
    userName: {
    id: null,
    username: "",
    email: "",
    password:""
  },
  deleteReqToken: "", 
  submitted: false,
      
    };
  },
   methods: {
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
    this.$store.dispatch('auth/logout');
    this.$router.push('/login');
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
    }
  
},
saveProfile(){
var data = {
      unername: this.currentUser.username,
      email: this.currentUser.email,
    };
    console.log(data);
    var id = this.currentUser.id;
     UserService.update(id, data).then((response) => {
        
        console.log(response.data);
        var newUser = {
          id:this.currentUser.id,
          username :this.currentUser.username,
          email: this.currentUser.email,
          roles: this.currentUser.roles,
          accessToken: this.currentUser.accessToken
        }
        localStorage.setItem('user', JSON.stringify(newUser));
        this.editAccount = false;

      })
      .catch((e) => {
        console.log(e);
      });
},
   },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>