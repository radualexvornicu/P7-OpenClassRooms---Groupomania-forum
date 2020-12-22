<template>
<div class="jumbotron jumbotron-fluid p-0">
<div class="submit-form">
    <div class="col-md-6" v-if="!submitted">
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
            <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
                <a
            class="btn btn-danger m-1 p-0"
            :href="'/admin'"
          >
            Cancel
          </a>
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <a
            class="btn btn-danger m-1 p-0"
            :href="'/mod'"
          >
            Cancel
          </a>
              </div>
              <div v-default>
                <a
            class="btn btn-danger m-1 p-0"
            :href="'/user'"
          >
            Cancel
          </a>
              </div>
            </div>
           
          </div>
    <div class="col-md-6" v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCategorie()">Add</button>
      <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
                <a
            class="btn btn-danger m-1 p-0"
            :href="'/admin'"
          >
            Cancel
          </a>
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <a
            class="btn btn-danger m-1 p-0"
            :href="'/mod'"
          >
            Cancel
          </a>
              </div>
              <div v-default>
                <a
            class="btn btn-danger m-1 p-0"
            :href="'/user'"
          >
            Cancel
          </a>
              </div>
            </div>
           
    </div>
  </div>
</div>
  
          
</template>
<script>
import CategoriesDataService from "../services/CategoriesDataService";
const user = JSON.parse(localStorage.getItem("user"));


export default {
  name: "add-categorie",
  data() {
    return {
      role: "",
      indexCat: "",
      categories: [],
      currentCategorie: null,
      currentIndexCat: -1,
      catname: "",
      categorie: {
        id: null,
        catname: "",
        catdescription: "",
        userId: "",
      },
      
      submitted: false,
      
    };
  },
  methods: {
    // 1
    newCategorie() {
      this.submitted = false;
      this.categorie = {};
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
              this.submitted = true;
              console.log(this.submitted);
      })
      .catch((e) => {
        console.log(e);
      });
},
  },
  mounted(){
    this.role = user.roles[1];
  }
};
</script>

<style >
.list-group li {
  cursor: pointer;
}


</style>