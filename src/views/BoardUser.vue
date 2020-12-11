<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
    
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/categories" class="nav-link">Categories</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>

   <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
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
      
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(categories, index) in categories"
          :key="index"
          @click="setActiveCategorie(categories, index)"
        >
          {{ categories.catname }}
        </li>
      </ul>  

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCategories">
        Remove All
      </button>
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
  </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import CategoriesDataService from "../services/CategoriesDataService";

export default {
  name: 'User',
 // name: "categories-list",
  data() {
    return {
      content: '',
      categories: {
        id: null,
        catname: "",
        catdescription: "",
        userId:""
      },

      Categories: [],
      currentCategorie: null,
       message: '',
      currentIndex: -1,
      catname: ""
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

    refreshList() {
      this.retrieveCategories();
      this.currentCategorie = null;
      this.currentIndex = -1;
    },

    setActiveCategorie(categories, index) {
      this.currentCategorie = categories;
      this.currentIndex = index;
      console.log(index);
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
    }
  },
  mounted() {
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
    this.retrieveCategories();
  }
};
</script>