<template>
<div class="jumbotron jumbotron-fluid p-0">
<div class="submit-form">
    <div class="col-md-6" v-if="!submitted">
      <h5 >Edit Post id: {{post.id}}</h5>
            <div class="form-group">
              <label for="postcontent">Edit Post here</label>
              <input
                type="text"
                class="form-control"
                id="postcontent"
                required
                v-model="post.postcontent"
                name="postcontent"
              />
            </div>            
            <button @click=" editPost();" class="btn btn-success m-1 p-0">
              Submit
            </button>
            <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
               <router-link :to="'/admin'" class="btn btn-info m-1 p-1">Cancel</router-link>
                
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <router-link :to="'/mod'" class="btn btn-info m-1 p-1">Cancel</router-link>
              </div>
              <div v-default>
                <router-link :to="'/user'" class="btn btn-info m-1 p-1">Cancel</router-link>
              </div>
            </div>
           
          </div>
    <div class="col-md-6" v-else>
      <h4>You edited successfully!</h4>
      <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
               <router-link :to="'/admin'" class="btn btn-info m-1 p-1">Back</router-link>
                
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <router-link :to="'/mod'" class="btn btn-info m-1 p-1">Back</router-link>
              </div>
              <div v-default>
                <router-link :to="'/user'" class="btn btn-info m-1 p-1">Back</router-link>
              </div>
            </div>
           
    </div>
  </div>
</div>
  
          
</template>
<script>
import PostsDataService from "../services/PostsDataService";

const user = JSON.parse(localStorage.getItem("user"));


export default {
  name: "edit-post",
  data() {
    return {
      role: "",
      post: {
        id: null,
        postcontent: "",
        topicId: "",
        userId: "",
      },
      submitted: false,
      
    };
  },
  methods: {
    // 1
    
    getPost(id){
      
      PostsDataService.get(id)
      .then((response) => {
         console.log(response.data);
        this.post = response.data;
        
      })
      .catch((e) => {
        console.log(e);
      });
    }, 
editPost(){
    var data = {
      postcontent: this.post.postcontent,
      topicId: this.post.topicId,
      userId: this.post.userId,
    };
    console.log(data);
    var id = this.post.id;
    PostsDataService.update(id, data).then((response) => {
        
        console.log(response.data);
        this.submitted = true;
      })
      .catch((e) => {
        console.log(e);
      });
},
  },
  mounted(){
    this.role = user.roles[0];
    this.getPost(this.$route.params.id);
  }
};
</script>

<style >
.list-group li {
  cursor: pointer;
}


</style>