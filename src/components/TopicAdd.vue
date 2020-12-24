<template>
<div class="jumbotron jumbotron-fluid p-0">
<div class="submit-form">
    <div class="col-md-6" v-if="!submitted">      

            <h5 >Start Topic Discution in <br> "{{categorie.catname}}" - Categorie</h5>
            <div class="form-group">
              <label for="topicsubject">Topic Content</label>
              <textarea
                type="text"
                class="form-control"
                id="topicsubject"
                required
                v-model="topic.topicsubject"
                name="topicsubject"
              />
            </div>            
            <button @click=" saveTopic();" class="btn btn-success m-1 p-0">
              Submit
            </button>
            <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
                <router-link :to="'/admin'" class="btn btn-danger m-1 p-0">Cancel</router-link>
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <router-link :to="'/mod'" class="btn btn-danger m-1 p-0">Cancel</router-link>
              </div>
              <div v-default>
                <router-link :to="'/user'" class="btn btn-danger m-1 p-0">Cancel</router-link>
              </div>
            </div>
           
          </div>
    <div class="col-md-6" v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newInfo();">Add</button>
      <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
               <router-link :to="'/admin'" class="btn btn-danger m-1 p-0">Cancel</router-link>
                
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <router-link :to="'/mod'" class="btn btn-danger m-1 p-0">Cancel</router-link>
              </div>
              <div v-default>
                <router-link :to="'/user'" class="btn btn-danger m-1 p-0">Cancel</router-link>
              </div>
            </div>
           
    </div>
  </div>
</div>
  
          
</template>
<script>
import TopicsDataService from "../services/TopicsDataService";
import CategoriesDataService from "../services/CategoriesDataService";

const user = JSON.parse(localStorage.getItem("user"));


export default {
  name: "add-topic",
  data() {
    return {
      role: "",
     topics: [],
      currentTopic: null,
      currentIndexTopic: -1,
      topicsubject: "",
      topic: {
        id: null,
        topicsubject: "",
        categorieId: "",
        userId: "",
      },
      
      submitted: false,
      categorie: {
        id: null,
        catname: "",
        catdescription: "",
        userId: "",
      },
      
    };
  },
  methods: {
    // 1
    newInfo() {
      this.submitted = false;
      this.topic = {};
    },
    getCategorie(id){
      console.log("edit cat id:", id);
      CategoriesDataService.get(id)
      .then((response) => {
         console.log(response.data);
        this.categorie = response.data;
        console.log(this.categorie);
      })
      .catch((e) => {
        console.log(e);
      });
    }, 
saveTopic(){
    var data = {
      topicsubject : this.topic.topicsubject,
      categorieId: this.categorie.id,
      userId : user.id,
    }
    console.log(data);
    TopicsDataService.create(data)
    .then((response) => {
        this.topic.id = response.data.id;
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
    this.getCategorie(this.$route.params.id);
  }
};
</script>

<style >
.list-group li {
  cursor: pointer;
}


</style>