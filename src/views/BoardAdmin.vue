<template>

  <div class="jumbotron jumbotron-fluid p-0">    
    <header class="d-flex flex-row bd-highlight mb-3"
    v-if="content == 'Admin Content.'">
        <div class="col-md-4">
          <div class="col-md-12"> 
            per Page
            <select v-model="pageSizeCat" @change="PageSizeChangeCat($event)">
            <option v-for="sizeCat in pageSizesCat" :key="sizeCat" :value="sizeCat">
            {{ sizeCat }}
            </option>
            </select>
          <h5 >Categories</h5>
          </div>
          
         <div class="p-0 m-0">
          <b-pagination
        v-model="pageCat"
        :total-rows="countCat"
        :per-page="pageSizeCat"
        size="sm"
        prev-text="Prev"
        next-text="Next"
        @change="PageChangeCat"
          > </b-pagination>          
      </div>
          <ul class="list-group">
        <li
  
  class="list-group-item list-group-item-action list-group-item-info p-1 m-1 rounded"
  :class="{ active: indexCat == currentIndexCat }"
  v-for="(categorie, indexCat) in categories"
  :key="indexCat"
  @click.stop="validateCheck(); setActiveCategorie(categorie, indexCat); getUserNameCat(categorie.userId);"
>
  <h6 class="">{{ categorie.catname }} </h6> 
    <p class="border-top border-danger ml-1 p-0 d-flex justify-content-between align-items-center" 
    v-if="indexCat == currentIndexCat">{{ categorie.catdescription }}
    <span class="badge badge-danger badge-pill m-1">{{countTopic}}</span>
    </p>
  </li>
</ul>
<ul class="list-group">
        <li  class="list-group-item list-group-item-action list-group-item-success p-1 m-1 rounded"
        @click="validateCheck(); showAllTopics();  ">
          Show All Posts
        </li>
      </ul>
        </div>
                  
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
                @click="validateCheck(); pageCat = 1; searchCatname; "
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
          <router-link :to="'/categorie/add'" class="btn btn-sm btn-info">Add New Categorie</router-link>
          
        <div v-if="currentCategorie" class="flex-column">
          <router-link :to="'/categorie/' + currentCategorie.id" class="badge badge-warning">Edit 2</router-link>
          <button
            type="button"
            class="btn btn-danger m-1 p-0"
            v-if="currentCategorie"
            @click="validateCheck(); removeCategorie(currentCategorie.id);"
          >
            Delete
          </button>
  
             
        </div>      
      <main >
      <section  v-show="allCategorie">
  <div class=" m-0 p-0">
    <div class="mb-3">
      <select v-model="pageSizeTopic" @change="PageSizeChangeTopic($event)">
        <option v-for="sizeTopic in pageSizesTopic" :key="sizeTopic" :value="sizeTopic">
          {{ sizeTopic }}
        </option>
      </select>
    </div>

    <b-pagination v-model="pageTopic" :total-rows="countTopic" :per-page="pageSizeTopic" size="sm" prev-text="Prev"
      next-text="Next" @change="PageChangeTopic"></b-pagination>
  </div>
  <h4>All Posts</h4>
  <div class="card" :class="{ active: indexTopic == currentIndexTopic }"
    v-for="(topic, indexTopic) in topics" :key="indexTopic"
    @click="validateCheck(); setActiveTopic(topic, indexTopic); getUserNameTopic(topic.userId) ">
    <div class="card-header">
      <p class="card-text">{{ topic.topicsubject }}</p>
      <div v-if="indexTopic == currentIndexTopic" class="card-body  p-0 d-flex justify-content-between align-items-center">
            <div  >
      <h6>By:{{userNameTopic}}</h6>
      
      <router-link type="button" class="badge badge-warning m-1 p-0"
        @click=" validateCheck(); submitted = 2;">
        Edit
      </router-link>  
      <button type="button" class="badge badge-danger m-1 p-0" 
        @click="validateCheck(); removeTopic(currentTopic.id, currentCategorie.id);">
        Delete
      </button>
    </div>
            <div>
            <router-link :to="'/post'+ currentTopic.id" class="badge badge-info"
            >View Comments <span
             class="badge badge-danger badge-pill">{{countPost}}
             </span>
             </router-link>    
            
      
            </div>
            
            
    </div>
    </div>
    
  </div>
</section>
<section  v-if="currentCategorie">
  <div class=" m-0 p-0">
    <div class="mb-3">
      <select v-model="pageSizeTopic" @change="PageSizeChangeTopic($event)">
        <option v-for="sizeTopic in pageSizesTopic" :key="sizeTopic" :value="sizeTopic">
          {{ sizeTopic }}
        </option>
      </select>
    </div>

    <b-pagination v-model="pageTopic" :total-rows="countTopic" :per-page="pageSizeTopic" size="sm" prev-text="Prev"
      next-text="Next" @change="PageChangeTopic"></b-pagination>
  </div>
  <h4>{{currentCategorie.catname}} => Posts</h4> 
  <router-link :to="'/post/add'+ currentCategorie.id" class="btn btn-success m-1 p-0"
  >Add Post</router-link>  

  <div class="card" :class="{ active: indexTopic == currentIndexTopic }"
    v-for="(topic, indexTopic) in topics" :key="indexTopic"
    @click="validateCheck(); setActiveTopic(topic, indexTopic); getUserNameTopic(topic.userId) ">
    <div class="card-header">
      <div class="card-body  p-0">
      <p class="card-text">{{ topic.topicsubject }}</p>            
    </div>
    </div>
    <div d-flex justify-content-between align-items-center>
      <h6>By:{{userNameTopic}}</h6>
      <span class="badge badge-danger badge-pill">{{countPost}}</span>
      <button type="button" class="btn btn-warning m-1 p-0" v-if="indexTopic == currentIndexTopic"
        @click=" validateCheck(); submitted = 2;">
        Edit
      </button>
      <button type="button" class="btn btn-success m-1 p-0" v-if="indexTopic == currentIndexTopic"
        @click="validateCheck(); submitted = 3;">
        Add Post
      </button>

      <button type="button" class="btn btn-danger m-1 p-0" v-if="indexTopic == currentIndexTopic"
        @click="validateCheck(); removeTopic(currentTopic.id, currentCategorie.id);">
        Delete
      </button>
    </div>
  </div>
</section>
    </main>
    </div>
    </header>
    
  </div>
</template>

<script>
import UserService from "../services/user.service";
import CategoriesDataService from "../services/CategoriesDataService";
import TopicsDataService from "../services/TopicsDataService";
import PostsDataService from "../services/PostsDataService";
const user = JSON.parse(localStorage.getItem("user"));

export default {
  name: "Admin",
  data() {
    return {
      content: "",
      allCategorie: true,
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
      //
      pageCat: 1,
      countCat: 0,
      pageSizeCat: 3,

      pageSizesCat: [3, 6, 9],

      pageTopic: 1,
      countTopic: 0,
      pageSizeTopic: 6,

      pageSizesTopic: [6, 9],

      pagePost: 1,
      countPost: 0,
      pageSizePost: 3,

      pageSizesPost: [3, 6, 9],
      //
    };
  },
  methods: {
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
// 1
getRequestParamsCat(catname, pageCat, pageSizeCat) {
      let params = {};

      if (catname) {
        params["catname"] = catname;
      }

      if (pageCat) {
        params["page"] = pageCat - 1;
      }

      if (pageSizeCat) {
        params["size"] = pageSizeCat;
      }

      return params;
    },
// 2
retrieveCategories() {
  const params = this.getRequestParamsCat(
        this.catname,
        this.pageCat,
        this.pageSizeCat
      );
    CategoriesDataService.getAll(params)
      .then((response) => {
         console.log(response.data);
        this.categories = response.data.categories;
        console.log(this.categories);
        this.countCat = response.data.totalItems;
        console.log(this.countCat);
      })
      .catch((e) => {
        console.log(e);
      });
},
// 3
 PageChangeCat(value) {
      this.pageCat = value;
      this.retrieveCategories();
},
// 4
PageSizeChangeCat(event) {
      this.pageSizeCat = event.target.value;
      this.pageCat = 1;
      this.retrieveCategories();
    },
// 1
getRequestParamsTopic(topicsubject, pageTopic, pageSizeTopic) {
      let params = {};

      if (topicsubject) {
        params["topicsubject"] = topicsubject;
      }

      if (pageTopic) {
        params["page"] = pageTopic - 1;
      }

      if (pageSizeTopic) {
        params["size"] = pageSizeTopic;
      }

      return params;
    },
// 2
retrieveTopics(catID) {
  this.currentTopic = null;
  this.currentIndexTopic = -1;
  const params = this.getRequestParamsTopic(
        this.topicsubject,
        this.pageTopic,
        this.pageSizeTopic
      );
    TopicsDataService.getAllPage(params, catID)
      .then((response) => {
         console.log(response.data);
        this.topics = response.data.topics;
        console.log(this.topics);
        this.countTopic = response.data.totalItems;
        console.log(this.countTopic);
      })
      .catch((e) => {
        console.log(e);
      });
},
//  3
 PageChangeTopic(value) {
      this.pageTopic = value;      
      if(!this.allCategorie){
        var catID = this.currentCategorie.id;
        this.retrieveTopics(catID);
      } else {
        this.showAllTopics();
      }
    
},
// 4
PageSizeChangeTopic(event) {
      this.pageSizeTopic = event.target.value;
      this.pageTopic = 1;      
    if(!this.allCategorie){
      var catID = this.currentCategorie.id;
        this.retrieveTopics(catID);
      } else {
        this.showAllTopics();
      }
    },
// 1
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
      var topicID = this.currentTopic.id;
    console.log(topicID);
    this.retrievePosts(topicID);
},
// 4
PageSizeChangePost(event) {
      this.pageSizePost = event.target.value;
      this.pagePost = 1;
      var topicID = this.currentTopic.id;
    console.log(topicID);
    this.retrievePosts(topicID);
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
    this.allCategorie = false;
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

setActiveTopic(topic, indexTopic) {
    
this.currentTopic = topic;
this.currentIndexTopic = indexTopic;
var topID = this.currentTopic.id;
console.log(topID);
this.retrievePosts(topID);
},
removeTopic(topicId, catId){
    console.log(topicId);
    var r = confirm("Press a button!");
    if (r == true) {
      console.log("You pressed OK!");
      var r2 = confirm("Press a button AGAIN!");
      if (r2 == true) {
        console.log("You pressed OK AGAIN!");
      TopicsDataService.delete(topicId)
      .then((response) => {
        console.log(response.data);

        this.retrieveTopics(catId);
        this.showAllTopics();
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

editCategorie(catId) {
    var data = {
      catname: this.categorie.catname,
      catdescription: this.categorie.catdescription,
      userId: user.id,
    };
    console.log(data);
    var id = catId;
    console.log(id);
    CategoriesDataService.update(id, data)
      .then((response) => {
        this.categorie.id = response.data.id;
        console.log(response.data);
        this.submitted = 0;
        this.refreshCategorieList();
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
        this.submittedEditTopic = false;
        this.retrieveTopics(this.currentCategorie.id);
      })
      .catch((e) => {
        console.log(e);
      });
},
saveCategorie() {
    var data = {
      catname: this.categorie.catname,
      catdescription: this.categorie.catdescription,
      userId: user.id,
    };
    console.log(data);
    CategoriesDataService.create(data)
      .then((response) => {
        this.categorie.id = response.data.id;
        console.log(response.data);
        this.submitted = 0;
        this.refreshCategorieList();
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
        this.submittedSaveTopic = false;
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
        this.submittedSavePost = false;
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
        this.submittedEditPost = false;
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
showAllTopics(){
  this.currentCategorie = null;
  this.currentIndexCat = -1;
this.currentTopic = null;
  this.currentIndexTopic = -1;
  const params = this.getRequestParamsTopic(
        this.topicsubject,
        this.pageTopic,
        this.pageSizeTopic
      );
    TopicsDataService.getAll(params)
      .then((response) => {
         console.log(response.data);
        this.topics = response.data.topics;
        console.log(this.topics);
        this.countTopic = response.data.totalItems;
        console.log(this.countTopic);
      })
      .catch((e) => {
        console.log(e);
      });
      this.allCategorie = true;
},

  },
  mounted() {
    this.retrieveCategories();
    this.showAllTopics();
    UserService.getAdminBoard().then(
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

<style >
.list-group li {
  cursor: pointer;
}
.card{
  cursor: pointer;
}


</style>