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
          <button class="m-3 btn btn-sm btn-info" @click="addCategorie()">
            Add New Categorie
          </button>
        </div>
      </div>
      <div class="list row">
        <div class="col-md-6">
          <h4>Categories List</h4>
          <div
            class="card border-info mb-3"
            :class="{ active: indexCat == currentIndexCat }"
            v-for="(categories, indexCat) in categories"
            :key="indexCat"
            @click="setActiveCategorie(categories, indexCat)"
          >
            <div class="card-header">
              <p>{{ categories.catname }}</p>
            </div>
            <div class="card-body" v-show="indexCat == currentIndexCat">
              <h5 class="card-title">Categorie Description</h5>
              <p class="card-text">{{ categories.catdescription }}</p>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-warning"
                v-show="indexCat == currentIndexCat"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-success"
                v-show="indexCat == currentIndexCat"
              >
                Add Topic
              </button>
              <button
                type="button"
                class="btn btn-danger"
                v-show="indexCat == currentIndexCat"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6" v-show="currentCategorie">
          <h4>Topics List</h4>
          <ul class="list-group">
            <li
              class="list-group-item"
              :class="{ active: indexTopic == currentIndexTopic }"
              v-for="(topics, indexTopic) in topics"
              :key="indexTopic"
              @click="setActiveTopic(topics, indexTopic)"
            >
              {{ topics.topicsubject }}
            </li>
          </ul>
        </div>
        <div class="col-md-6" v-show="currentTopic">
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
          <div class="submit-form">
            <div v-if="!submittedPost">
              <div class="form-group">
                <label for="postcontent">Post Content</label>
                <input
                  type="text"
                  class="form-control"
                  id="postcontent"
                  required
                  v-model="post.postcontent"
                  name="postcontent"
                />
              </div>

              <button @click="savePost" class="btn btn-success">Submit</button>
            </div>

            <div v-else>
              <h4>You submitted successfully!</h4>
              <button class="btn btn-success" @click="newPost">Add</button>
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
  name: "User",
  data() {
    return {
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
      post: {
        id: null,
        postcontent: "",
        topicId: "",
        userId: "",
      },
      submittedPost: false,
    };
  },

  methods: {
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
      this.retrieveCategories();
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

    removeAllCategories() {
      CategoriesDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
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