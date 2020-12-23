<template>
<div class="jumbotron jumbotron-fluid p-0">
  <div v-if="currentCategorie">

  </div>
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

            <button @click="editCategorie();" class="btn btn-success m-1 p-0">
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
      <h4>You edited successfully!</h4>
      <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
                <a
            class="btn btn-danger m-1 p-0"
            :href="'/admin'"
          >
            Back
          </a>
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <a
            class="btn btn-danger m-1 p-0"
            :href="'/mod'"
          >
            Back
          </a>
              </div>
              <div v-default>
                <a
            class="btn btn-danger m-1 p-0"
            :href="'/user'"
          >
            Back
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
  name: "edit-categorie",
  data() {
    return {
      role: "",
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
    /*
    getCategorie(id){

    }, */
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