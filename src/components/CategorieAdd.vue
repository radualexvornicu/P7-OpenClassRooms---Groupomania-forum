<template>
  <div class="submit-form">
    
  

      <h5 >Create a new Categorie</h5>
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
              <textarea 
              type="text"
                class="form-control"
                id="catdescription"
                required
                v-model="categorie.catdescription"
                name="catdescription"
              />
            </div>

            <button @click="saveCategorie();" class="btn btn-success m-1 p-0">
              Submit
            </button>
            <button  class="btn btn-danger m-1 p-0">
              Cancel
            </button>
          </div>
</template>
<script>
import CategoriesDataService from "../services/CategoriesDataService";
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



  },
  mounted() {
    this.retrieveCategories();
    this.showAllTopics();
    
  },
};
</script>

<style >
.list-group li {
  cursor: pointer;
}


</style>