<template>
<div class="jumbotron jumbotron-fluid d-flex flex-row justify-content-center p-0">
<section class="col-6">
  <div class="card border-success mb-3">
    <div class="card-header  ">
      <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
               <router-link :to="'/admin'" class="btn btn-danger rounded-circle m-1 pl-1 pr-1 pt-0 pb-0">X</router-link>
                
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <router-link :to="'/mod'" class="btn btn-danger rounded-circle m-1 pl-1 pr-1 pt-0 pb-0">X</router-link>
              </div>
              <div v-default>
                <router-link :to="'/user'" class="btn btn-danger rounded-circle m-1 pl-1 pr-1 pt-0 pb-0">X</router-link>
              </div>
            </div>
      <div class="d-flex justify-content-between align-items-center">
      <h4 class="card-text font-weight-bold">{{ topic.topicsubject }}</h4> 
      <cite>
      <p class="text-sm-right">{{topic.updatedAt | moment("from", "now")}}</p>
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

    <b-pagination v-model="pagePost" :total-rows="countPost" :per-page="pageSizePost" size="sm" prev-text="Prev"
      next-text="Next" @change="PageChangePost"></b-pagination>
  </div>
  <div v-if="!reply">
    <div class="form-group">
              <label for="postcontent">Post a Comment</label>
              <textarea
                type="text"
                class="form-control"
                id="postcontent"
                required
                v-model="post.postcontent"
                name="postcontent"
              />
            </div>            
            <button @click="validateCheck(); savePost();" class="btn btn-success m-1 p-0">
              Submit
            </button>
  </div>
  <div v-if="reply">
  <div class="form-group">
              <label for="replypost">Reply a Comment</label>
              <textarea
                type="text"
                class="form-control"
                id="replypost"
                required
                v-model="replypost"
                name="replypost"
              />
            </div>            
            <button @click="validateCheck(); savePost();" class="btn btn-success m-1 p-0">
              Submit
            </button>
            <button @click="validateCheck(); reply = false;" class="btn btn-danger m-1 p-0">
              Cancel
            </button>
  </div>
  <ul>
  
  <li class="list-group-item list-group-item-warning mb-2 rounded "
    v-for="(post, indexPost) in posts" :key="indexPost"
    @click="validateCheck(); setActivePost(posts, indexPost); getUserNamePost(post.userId)">
    <div class="d-flex justify-content-between align-items-center">
      <h5>{{ post.postcontent }}</h5>
      <p>{{post.updatedAt | moment("from", "now")}}</p>
    </div>
    <div class="" v-if="indexPost == currentIndexPost">
        <h6>created by <strong>{{userNamePost}}</strong></h6>
      <button type="button" class="btn btn-success m-1 p-0" v-show="sameUserPost()"
        @click="validateCheck(); replyPost(currentPost[currentIndexPost].postcontent);">
        Reply
      </button>
      <router-link :to="'/post/edit/' + currentPost[currentIndexPost].id" class="btn btn-warning m-1 p-0" 
        @click="validateCheck();">
        Edit
      </router-link>

      <button type="button" class="btn btn-danger m-1 p-0" 
        @click="validateCheck(); removePost(topic.id, currentPost[currentIndexPost].id);">
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
      reply: false,
      replypost: "",
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
      console.log(this.user.username, "loged user");
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
    console.log(this.currentPost, "current Post");
    this.currentIndexPost = indexPost;
    console.log(this.currentPost[this.currentIndexPost]);
}, 
savePost() {
    var data = {
      postcontent: this.replypost,
      topicId: this.topic.id,
      userId: user.id,
    };
    console.log(data);
    PostsDataService.create(data)
      .then((response) => {
        this.post.id = response.data.id;
        console.log(response.data);
        this.reply = false;
        this.retrievePosts(this.topic.id);
      })
      .catch((e) => {
        console.log(e);
      });
},
sameUserPost(){
      if(this.userNamePost == user.username){
        return true;
      }
      else {
        return false;
      }
  },
  replyPost(data){
    console.log(data, "its my data");
    this.replypost = " '' " +  this.userNamePost + " said: " + data + " '' " + "\n";
    console.log(this.replypost);
    this.reply = true;
  },
  removePost(topicId, postId){
    console.log(postId);
          var r = confirm("Press a button!");
          if (r == true) {
            console.log("You pressed OK!");
            var r2 = confirm("Press a button AGAIN!");
            if (r2 == true) {
              console.log("You pressed OK AGAIN!");
            PostsDataService.delete(postId)
            .then((response) => {
              console.log(response.data);
    
              this.retrievePosts(topicId);
            })
            .catch((e) => {
              console.log(e);
            });
            }else {
            console.log("You pressed ABORTED!");
                }
        } else {
            console.log("You pressed CANCEL!");
          }
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
 li {
  cursor: pointer;
}


</style>