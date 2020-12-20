<template>

  <div class="jumbotron jumbotron-fluid">    
    <div class="d-flex flex-column bd-highlight mb-3"
    v-if="content == 'Moderator Content.'">
      <div class="list row">
        <div class="col-md-8">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search by Categorie name"
              v-model="catname"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="validateCheck(); searchCatname; "
              >
                Search
              </button>
            </div>
          </div>
          <button
            class="m-3 btn btn-sm btn-success"
            @click="validateCheck(); refreshCategorieList();"
          >
            Refresh Categorie list
          </button>
          <div v-switch="submitted">
    <div v-case="0"></div>
    <div v-case="1"><div  class="submit-form  col-md-6">
              <h5 >Add Topic to Active Categorie</h5>
              <div class="form-group">
                <label for="topicsubject">Topic subject</label>
                <input
                  type="text"
                  class="form-control"
                  id="topicsubject"
                  required
                  v-model="topic.topicsubject"
                  name="topicsubject"
                />
              </div>            
              <button @click="validatecheck(); saveTopic();" class="btn btn-success m-1 p-0">
                Submit
              </button>
              <button @click="validateCheck(); submitted = 0;" class="btn btn-danger m-1 p-0">
                Cancel
              </button>
            </div>
            </div>
    <div v-case="2"><div  class="submit-form  col-md-6">
              <h5 >Edit Topic in Active Categorie</h5>
              <div class="form-group">
                <label for="topicsubject">Topic subject</label>
                <input
                  type="text"
                  class="form-control"
                  id="topicsubject"
                  required
                  v-model="topic.topicsubject"
                  name="topicsubject"
                />
              </div>            
              <button @click="validateCheck(); editTopic(currentTopic.id);" class="btn btn-success m-1 p-0">
                Submit
              </button>
              <button @click="validateCheck(); submitted = 0;" class="btn btn-danger m-1 p-0">
                Cancel
              </button>
            </div></div>
    <div v-case="3"><div  class="submit-form  col-md-6">
              <h5 >Add Post to Active Topic</h5>
              <div class="form-group">
                <label for="postcontent">Post Content</label>
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
              <button @click="validateCheck(); submitted = 0;" class="btn btn-danger m-1 p-0">
                Cancel
              </button>
            </div></div>
    <div v-case="4"><div  class="submit-form  col-md-6">
              <h5 >Edit Current Active Post</h5>
              <div class="form-group">
                <label for="postcontent">Post Content</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="postcontent"
                  required
                  v-model="post.postcontent"
                  name="postcontent"
                />
              </div>            
              <button @click="validateCheck(); editPost(currentPost.id)" class="btn btn-success m-1 p-0">
                Submit
              </button>
              <button @click="validateCheck(); submitted = 0;" class="btn btn-danger m-1 p-0">
                Cancel
              </button>
            </div></div>
          </div>        
        </div>
        
      </div>
      <div class="d-flex flex-wrap">
        <div class="col-md-4">
          <h4>Categories List</h4>
          <div
            type="button"
            class="card border-info mb-3 btn-light"
            :class="{ active: indexCat == currentIndexCat }"
            v-for="(categories, indexCat) in categories"
            :key="indexCat"
            @click="validateCheck(); setActiveCategorie(categories, indexCat); getUserNameCat(categories.userId);"
          >
            <div class="card-header">
              <h5>{{ categories.catname }} </h5>
              
            </div>
            <div class="card-body" v-if="indexCat == currentIndexCat">
              <h6 class="card-title font-weight-bold">Categorie Description </h6>
              
              <h6 class="card-text">{{ categories.catdescription }}</h6>
              <cite><h6>created by <strong>{{userNameCat}}</strong></h6></cite> 
            </div>
            <div>
              
              <button
                type="button"
                class="btn btn-success m-1 p-0"
                v-if="indexCat == currentIndexCat"
                @click="validateCheck(); submitted = 1;"
              >
                Add Topic
              </button>
              
            </div>
          </div>
          
        </div>

        <div class="col-md-4" v-if="currentCategorie">
          <h4>Topics List</h4>
          <div
            type="button"
            class="card border-info mb-3 btn-light"
            :class="{ active: indexTopic == currentIndexTopic }"
            v-for="(topics, indexTopic) in topics"
            :key="indexTopic"
            @click="validateCheck(); setActiveTopic(topics, indexTopic); getUserNameTopic(topics.userId)"
          >
            <div class="card-header">
              <h5>{{ topics.topicsubject }}</h5>
            </div>
            <div class="card-body" v-if="indexTopic == currentIndexTopic">
              <h6 class="card-title font-weight-bold">Topic Thead</h6>
              <h6 class="card-text">Active thred length - {{posts.length}}</h6>
              <cite><h6>created by <strong>{{userNameTopic}}</strong></h6></cite>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-warning m-1 p-0"
                v-if="indexTopic == currentIndexTopic"
                @click=" validateCheck(); submitted = 2;"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-success m-1 p-0"
                v-if="indexTopic == currentIndexTopic"
                @click="validateCheck(); submitted = 3;"
              >
                Add Post
              </button>

              
            </div>
          </div>
        </div>
        <div class="col-md-4" v-if="currentCategorie">
          <h4>Posts Thread</h4>
          <div
            type="button"
            class="card border-info mb-3 btn-light"
              :class="{ active: indexPost == currentIndexPost }"
            v-for="(posts, indexPost) in posts"
              :key="indexPost"
              @click="validateCheck(); setActivePost(posts, indexPost); getUserNamePost(posts.userId)">
            <div class="card-header">
              <h6>{{ posts.postcontent }}</h6>
            </div>
            <div class="card-body" v-if="indexPost == currentIndexPost">
              <cite><h6 class="card-text">created at {{posts.createdAt}}</h6></cite>
              <cite><h6 class="card-text">created at {{posts.updatedAt}}</h6></cite>
              <cite><h6>created by <strong>{{userNamePost}}</strong></h6></cite>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-warning m-1 p-0"
                v-if="indexPost == currentIndexPost"
                @click="validateCheck();  submitted =4;"
              >
                Edit
              </button>
              
              <button
                type="button"
                class="btn btn-danger m-1 p-0"
                v-if="indexPost == currentIndexPost"
                @click="validateCheck(); removePost(currentTopic.id, currentPost.id);"
              >
                Delete
              </button>
            </div>
          </div>
        </div>        
      </div>      
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import CategoriesDataService from "../services/CategoriesDataService";
import TopicsDataService from "../services/TopicsDataService";
import PostsDataService from "../services/PostsDataService";
const user = JSON.parse(localStorage.getItem("user"));

export default {
  name: "Moderator",
  data() {
    return {
      content: "",
      indexCat: "",
      categories: [],
      currentCategorie: null,
      currentIndexCat: -1,
      catname: "",
      topics: [],
      currentTopic: null,
      currentIndexTopic: -1,
      topicsubject: "",
      posts: [],
      currentPost: null,
      currentIndexPost: -1,
      postcontent: "",
      categorie: {
        id: null,
        catname: "",
        catdescription: "",
        userId: "",
      },
      topic: {
        id: null,
        topicsubject: "",
        categorieId: "",
        userId: "",
      },
      post: {
        id: null,
        postcontent: "",
        topicId: "",
        userId: "",
      },
      userNameCat: "",
      userNameTopic: "",
      userNamePost: "",
     submitted: 0,
    };
  },

  methods: {
   validateCheck(){
        console.log("click for validateCheck");
           UserService.getModeratorBoard().then(
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
getUserNameCat(id){
        UserService.getUserName(id)
        .then((response) => {
          this.userNameCat = response.data.username;
          console.log(response.data);
        }).catch((e) => {
            console.log(e);
          });
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


retrieveCategories() {
    CategoriesDataService.getAll()
      .then((response) => {
        this.categories = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
},
refreshCategorieList() {
    this.submitted = 0;
    this.retrieveCategories();
    this.currentTopic = null;
    this.currentIndexTopic = -1;
    this.currentPost = null;
    this.currentIndexPost = -1;
    this.currentCategorie = null;
    this.currentIndexCat = -1;
},
setActiveCategorie(categorie, indexCat) {
    this.currentTopic = null;
    this.currentIndexTopic = -1;
    this.currentPost = null;
    this.currentIndexPost = -1;
    this.currentCategorie = categorie;
    this.currentIndexCat = indexCat;
    var catID = this.currentCategorie.id;
    console.log(catID);
    this.retrieveTopics(catID);
},
removeCategorie(catId) {
    console.log(catId);
    var r = confirm("Press a button!");
    if (r == true) {
      console.log("You pressed OK!");
      var r2 = confirm("Press a button AGAIN!");
      if (r2 == true) {
        console.log("You pressed OK AGAIN!");
      CategoriesDataService.delete(catId)
      .then((response) => {
        console.log(response.data);

        this.refreshCategorieList();
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
searchCatname() {
    CategoriesDataService.findByTitle(this.catname)
      .then((response) => {
        this.categories = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
},
retrieveTopics(catid) {
    this.currentTopic = null;
    this.currentIndexTopic = -1;
    var id = catid;
    console.log(id);
    TopicsDataService.getAll(id)
      .then((response) => {
        this.topics = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
},
setActiveTopic(topic, indexTopic) {
this.currentTopic = topic;
this.currentIndexTopic = indexTopic;
var topID = this.currentTopic.id;
console.log(topID);
this.retrievePosts(topID);
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
retrievePosts(topID) {
    var id = topID;
    console.log(id);
    PostsDataService.getAll(id)
      .then((response) => {
        this.posts = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
},
editTopic(topicId){
    var data = {
      topicsubject: this.topic.topicsubject,
      categorieId: this.currentCategorie.id,
      userId: user.id,
    };
    console.log(data);
    var id = topicId;
    TopicsDataService.update(id, data).then((response) => {
        this.topic.id = response.data.id;
        console.log(response.data);
        this.submitted = 0;
        this.retrieveTopics(this.currentCategorie.id);
      })
      .catch((e) => {
        console.log(e);
      });
},

saveTopic(){
    var data = {
      topicsubject : this.topic.topicsubject,
      categorieId: this.currentCategorie.id,
      userId : user.id,
    }
    console.log(data);
    TopicsDataService.create(data)
    .then((response) => {
        this.topic.id = response.data.id;
        console.log(response.data);
        this.submitted = 0;
        this.retrieveTopics(this.currentCategorie.id);
      })
      .catch((e) => {
        console.log(e);
      });

},
savePost() {
    var data = {
      postcontent: this.post.postcontent,
      topicId: this.currentTopic.id,
      userId: user.id,
    };
    console.log(data);
    PostsDataService.create(data)
      .then((response) => {
        this.post.id = response.data.id;
        console.log(response.data);
        this.submitted = 0;
        this.retrievePosts(this.currentTopic.id);
      })
      .catch((e) => {
        console.log(e);
      });
},
editPost(postId){
    var data = {
      postcontent: this.post.postcontent,
      topicId: this.currentTopic.id,
      userId: user.id,
    };
    var id = postId;
    console.log(data);
    PostsDataService.update(id, data)
      .then((response) => {
        this.post.id = response.data.id;
        console.log(response.data);
        this.submitted = 0;
        this.retrievePosts(this.currentTopic.id);
      })
      .catch((e) => {
        console.log(e);
      });
},
setActivePost(post, indexPost) {
    this.currentPost = post;
    this.currentIndexPost = indexPost;
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
  },
  mounted() {
    this.retrieveCategories();
    UserService.getModeratorBoard().then(
      (response) => {
        this.content = response.data;        
      },
      (error) => { 
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          localStorage.removeItem('user');
          this.$router.push('/login');
      }
    );
  },
};
</script>
