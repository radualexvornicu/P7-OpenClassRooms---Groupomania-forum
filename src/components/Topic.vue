<template>
<div class="jumbotron jumbotron-fluid d-flex flex-row justify-content-center">
<section class="col-6">
  <div class="card border-success mb-3">
    <div class="card-header  ">
      <div class="d-flex justify-content-between align-items-center">
      <h4 class="card-text font-weight-bold">{{ topic.topicsubject }}</h4> 
      <cite>
      <p>{{topic.updatedAt | moment("from", "now")}}</p>
      </cite>
      </div>
       <div  class="card-body  p-0 d-flex justify-content-between align-items-center">
            <div  >
      <h6>By:{{userNameTopic}}</h6>
      
        
      
    </div>
            
            
    </div>
    </div>
    
  </div>
  <div class="">
    <div class="mb-3">
      Items per Page:
      <select v-model="pageSizePost" @change="PageSizeChangePost($event)">
        <option v-for="sizePost in pageSizesPost" :key="sizePost" :value="sizePost">
          {{ sizePost }}
        </option>
      </select>
    </div>

    <b-pagination v-model="pagePost" :total-rows="countPost" :per-page="pageSizePost"
     @change="PageChangePost"></b-pagination>
  </div>
  
  <h4>Response Posts</h4>
  <ul>
  
  <li class="list-group-item list-group-item-warning "
    v-for="(post, indexPost) in posts" :key="indexPost"
    @click="validateCheck(); setActivePost(posts, indexPost); getUserNamePost(post.userId)">
    <div class="d-flex justify-content-between align-items-center">
      <h5>{{ post.postcontent }}</h5>
      <p>{{post.updatedAt | moment("from", "now")}}</p>
    </div>
    <div class="" v-if="indexPost == currentIndexPost">
        <h6>created by <strong>{{userNamePost}}</strong></h6>
     
    </div>
    <div>
      <button type="button" class="btn btn-warning m-1 p-0" v-if="indexPost == currentIndexPost"
        @click="validateCheck();">
        Edit
      </button>

      <button type="button" class="btn btn-danger m-1 p-0" v-if="indexPost == currentIndexPost"
        @click="validateCheck(); removePost(currentPost.id);">
        Delete
      </button>
    </div>
  </li>
  </ul>
</section>

</div>
  
          
</template>
<script>
import UserService from "../services/user.service";
import PostsDataService from "../services/PostsDataService";
import TopicsDataService from "../services/TopicsDataService";
const user = JSON.parse(localStorage.getItem("user"));


export default {
  name: "edit-topic",
  data() {
    return {
      content:"",
      role: "",
      topic: {
        id: null,
        topicsubject: "",
        categorieId: "",
        userId: "",
      },
      posts: [],
      currentPost: null,
      currentIndexPost: -1,
      submitted: false,
      post: {
        id: null,
        postcontent: "",
        topicId: "",
        userId: "",
      },
       userNameTopic: "",
      userNamePost: "",
      pagePost: 1,
      countPost: 0,
      pageSizePost: 6,

      pageSizesPost: [6, 9, 12],
      
    };
  },
  methods: {
    // 1
    validateCheck(){
        console.log("click for validateCheck");
           UserService.getAdminBoard().then(
         (response) => {
           this.content = response.data;        
         },
         (error) => { 
           this.content =
             (error.response && error.response.data) ||
             error.message ||
             error.toString();
             this.$store.dispatch('auth/logout');
             this.$router.push('/login');
            
         }
       );
},
getUserNameTopic(id){
    UserService.getUserName(id)
    .then((response) => {
      this.userNameTopic = response.data.username;
      console.log(response.data);
    }).catch((e) => {
        console.log(e);
      });
},
    getTopic(id){
      console.log(" cat id:", id);
      TopicsDataService.get(id)
      .then((response) => {
         console.log(response.data);
        this.topic = response.data;
        this.getUserNameTopic(this.topic.userId);
        console.log(this.topic);
        console.log("i got everything");
      })
      .catch((e) => {
        console.log(e);
      });
    }, 
getRequestParamsPost(postcontent, pagePost, pageSizePost) {
      let params = {};

      if (postcontent) {
        params["postcontent"] = postcontent;
      }

      if (pagePost) {
        params["page"] = pagePost - 1;
      }

      if (pageSizePost) {
        params["size"] = pageSizePost;
      }

      return params;
    },
// 2
retrievePosts(topicID) {
  this.currentPost = null;
  this.currentIndexPost = -1;
  const params = this.getRequestParamsPost(
        this.postcontent,
        this.pagePost,
        this.pageSizePost
      );
    PostsDataService.getAll(params, topicID)
      .then((response) => {
         console.log(response.data);
        this.posts = response.data.posts;
        console.log(this.posts);
        this.countPost = response.data.totalItems;
        console.log(this.countPost);
      })
      .catch((e) => {
        console.log(e);
      });
},
// 3
 PageChangePost(value) {
      this.pagePost = value;
      var topicID = this.topic.id;
    console.log(topicID);
    this.retrievePosts(topicID);
},
// 4
PageSizeChangePost(event) {
      this.pageSizePost = event.target.value;
      this.pagePost = 1;
      var topicID = this.topic.id;
    console.log(topicID);
    this.retrievePosts(topicID);
    },
getUserNamePost(id){
    UserService.getUserName(id)
    .then((response) => {
      this.userNamePost = response.data.username;
      console.log(response.data);
    }).catch((e) => {
        console.log(e);
      });
},
setActivePost(post, indexPost) {
   
    this.currentPost = post;
    this.currentIndexPost = indexPost;
}, 
  },
  mounted(){
    this.role = user.roles[0];
    this.getTopic(this.$route.params.id);
    this.retrievePosts(this.$route.params.id);
  }
};
</script>

<style >
.list-group li {
  cursor: pointer;
}


</style>