<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="d-flex flex-column bd-highlight mb-3">
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
                @click="searchCatname"
              >
                Search
              </button>
            </div>
          </div>
          <button
            class="m-3 btn btn-sm btn-success"
            @click="refreshCategorieList()"
          >
            Refresh Categorie list
          </button>
          <button
            class="m-3 btn btn-sm btn-info"
            @click="submittedSaveCat = true"
          >
            Add New Categorie
          </button>
        </div>
      </div>
      <div class="list row">
        <div class="col-md-6">
          <h4>Categories List</h4>
          <div
            type="button"
            class="card border-info mb-3 btn-light"
            :class="{ active: indexCat == currentIndexCat }"
            v-for="(categories, indexCat) in categories"
            :key="indexCat"
            @click="setActiveCategorie(categories, indexCat); getUserNameCat(categories.userId);"
          >
            <div class="card-header">
              <h5>{{ categories.catname }} </h5>
              
            </div>
            <div class="card-body" v-if="indexCat == currentIndexCat">
              <h6 class="card-title font-weight-bold">Categorie Description </h6>
              
              <h6 class="card-text">{{ categories.catdescription }}</h6>
              <cite><h6>created by {{userNameCat}}</h6></cite> 
            </div>
            <div>
              <button
                type="button"
                class="btn btn-warning m-1 p-0"
                v-if="indexCat == currentIndexCat"
                @click="submittedEditCat = true"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-success m-1 p-0"
                v-if="indexCat == currentIndexCat"
              >
                Add Topic
              </button>
              <button
                type="button"
                class="btn btn-danger m-1 p-0"
                v-if="indexCat == currentIndexCat"
                @click="removeCategorie(currentCategorie.id)"
              >
                Delete
              </button>
            </div>
          </div>
          <div class="submit-form">
            <div v-if="submittedEditCat">
              <div class="form-group">
                <label for="catname">Categorie Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="catname"
                  required
                  v-model="categorie.catname"
                  name="catname"
                />
              </div>

              <div class="form-group">
                <label for="catdescription">Categorie Description</label>
                <input
                  class="form-control"
                  id="catdescription"
                  required
                  v-model="categorie.catdescription"
                  name="catdescription"
                />
              </div>

              <button
                @click="editCategorie(currentCategorie.id)"
                class="btn btn-success"
              >
                Submit
              </button>
            </div>
            <div v-if="submittedSaveCat">
              <div class="form-group">
                <label for="catname">Categorie Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="catname"
                  required
                  v-model="categorie.catname"
                  name="catname"
                />
              </div>

              <div class="form-group">
                <label for="catdescription">Categorie Description</label>
                <input
                  class="form-control"
                  id="catdescription"
                  required
                  v-model="categorie.catdescription"
                  name="catdescription"
                />
              </div>

              <button @click="saveCategorie()" class="btn btn-success">
                Submit
              </button>
            </div>
            <div v-if="submittedSaveTopic">
              <div class="form-group">
                <label for="catname">Categorie Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="catname"
                  required
                  v-model="categorie.catname"
                  name="catname"
                />
              </div>

              <div class="form-group">
                <label for="catdescription">Categorie Description</label>
                <input
                  class="form-control"
                  id="catdescription"
                  required
                  v-model="categorie.catdescription"
                  name="catdescription"
                />
              </div>

              <button @click="saveCategorie()" class="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6" v-if="currentCategorie">
          <h4>Topics List</h4>
          <div
            type="button"
            class="card border-info mb-3 btn-light"
            :class="{ active: indexTopic == currentIndexTopic }"
            v-for="(topics, indexTopic) in topics"
            :key="indexTopic"
            @click="setActiveTopic(topics, indexTopic); getUserNameTopic(topics.userId)"
          >
            <div class="card-header">
              <h5>{{ topics.topicsubject }}</h5>
            </div>
            <div class="card-body" v-if="indexTopic == currentIndexTopic">
              <h6 class="card-title font-weight-bold">Topic Thead</h6>
              <h6 class="card-text">Active thred length - {{posts.length}}</h6>
              <cite><h6>created by {{userNameTopic}}</h6></cite>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-warning m-1 p-0"
                v-if="indexTopic == currentIndexTopic"
                @click="submittedEditCat = true"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-success m-1 p-0"
                v-if="indexTopic == currentIndexTopic"
              >
                Add Topic
              </button>
              <button
                type="button"
                class="btn btn-danger m-1 p-0"
                v-if="indexTopic == currentIndexTopic"
                @click="removeTopic(currentTopic.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6" v-if="currentTopic">
          <h4>Posts Thread</h4>
          <ul class="list-group">
            <li
              class="list-group-item"
              :class="{ active: indexPost == currentIndexPost }"
              v-for="(posts, indexPost) in posts"
              :key="indexPost"
              @click="setActivePost(posts, indexPost)"
            >
              {{ posts.postcontent }}
            </li>
          </ul>
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
  name: "Admin",
  data() {
    return {
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
      post: {
        id: null,
        postcontent: "",
        topicId: "",
        userId: "",
      },
      userNameCat: "",
      userNameTopic: "",
      submittedPost: false,
      submittedSaveCat: false,
      submittedEditCat: false,
      submittedDeleteCat: false,
      submittedSaveTopic: false,
    };
  },

  methods: {
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
    submittedAll(){
      this.submittedPost = false;
      this.submittedSaveCat= false;
      this.submittedEditCat= false;
      this.submittedDeleteCat= false;
      this.submittedSaveTopic = false;
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
      this.submittedAll();
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
      /*   */
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

    refreshTopicsList() {
      this.retrieveTopics();
      this.currentTopic = null;
      this.currentIndexTopic = -1;
    },

    setActiveTopic(topic, indexTopic) {
      this.currentTopic = topic;
      this.currentIndexTopic = indexTopic;
      var topID = this.currentTopic.id;
      console.log(topID);
      this.retrievePosts(topID);
    },

    removeAllTopics() {
      TopicsDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
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
          this.submittedEditCat = false;
          this.refreshCategorieList();
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
          this.submittedSaveCat = false;
          this.refreshCategorieList();
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
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newCategorie() {
      this.submitted = false;
      this.post = {};
    },
  },
  mounted() {
    this.retrieveCategories();
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>