<template>
  <div class="container">
    <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Categorie name"
          v-model="catname"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchCatname"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Categories List</h4> 
      <button class="m-3 btn btn-sm btn-success" @click="refreshCategorieList()">
        Refresh Categorie list
      </button>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: indexCat == currentIndexCat }"
          v-for="(categories, indexCat) in categories"
          :key="indexCat"
          @click="setActiveCategorie(categories, indexCat);" >
          {{ categories.catname }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentCategorie">
        <h4>Categorie</h4>
        <div>
          <label><strong>Categorie Name:</strong></label> {{ currentCategorie.catname }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentCategorie.catdescription }}
        </div>
        
        <a class="badge badge-warning"
          :href="'/categories/' + currentCategorie.id"
        >
          Edit
        </a>
        
      </div>
      <div v-else>
        <br />
        <p>Please click on a Categorie...</p>
      </div>
    </div>
    <div class="col-md-6"
    v-show="currentCategorie">
    <h4>Topics List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: indexTopic == currentIndexTopic }"
          v-for="(topics, indexTopic) in topics"
          :key="indexTopic"
          @click="setActiveTopic(topics, indexTopic);"
        >
          {{ topics.topicsubject }}
        </li>
      </ul>
    </div>
    
  </div>

  </div>
</template>

<script>
import UserService from '../services/user.service';
import CategoriesDataService from "../services/CategoriesDataService";
import TopicsDataService from "../services/TopicsDataService";

export default {
  name: 'User',
  
  data() {
    
    return {
      showTopicsList : false,
      categories: [],
      currentCategorie: null,
      currentIndexCat: -1,
      catname: "",
      topics: [],
      currentTopic: null,
      currentIndexTopic: -1,
      topicsubject: ""
    };
    
  },
  
   methods: {
    retrieveCategories() {
      CategoriesDataService.getAll()
        .then(response => {
          this.categories = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshCategorieList() {
      
      this.retrieveCategories();
      this.currentCategorie = null;
      this.currentIndexCat = -1;
    },

    setActiveCategorie(categorie, indexCat) {
      this.currentCategorie = categorie;
      this.currentIndexCat = indexCat;
      var catID = this.currentCategorie.id;
      console.log(catID);
      this.retrieveTopics(catID);
    },

    removeAllCategories() {
      CategoriesDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
   searchCatname() {
      CategoriesDataService.findByTitle(this.catname)
        .then(response => {
          this.categories = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveTopics(catid) {
      var id = catid;
      console.log(id);
      TopicsDataService.getAll(id)
        .then(response => {
          this.topics = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  
    

  refreshTopicsList() {
      this.retrieveTopics();
      this.currentTopic = null;
      this.currentIndexTopic = -1;
    },

  setActiveTopic(topic, indexTopic) {
      this.currentTopic = topic;
      this.currentIndexTopic = indexTopic;
    },

    removeAllTopics() {
      TopicsDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
   searchCatname() {
      TopicsDataService.findByTitle(this.catname)
        .then(response => {
          this.topics = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  mounted() {
    this.retrieveCategories();
    UserService.getUserBoard().then(
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