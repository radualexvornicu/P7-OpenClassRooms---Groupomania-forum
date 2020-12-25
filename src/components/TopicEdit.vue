<template>
<div class="jumbotron jumbotron-fluid p-0">
<div class="submit-form">
    <div class="col-md-6" v-if="!submitted">
      <h5 >Edit Topic id: {{topic.id}}</h5>
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
            <button @click=" editTopic();" class="btn btn-success m-1 p-0">
              Submit
            </button>
            <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
               <router-link :to="'/admin'" class="btn btn-info m-1 p-1">Cancel</router-link>
                
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <router-link :to="'/mod'" class="btn btn-info m-1 p-1">Cancel</router-link>
              </div>
              <div v-default>
                <router-link :to="'/user'" class="btn btn-info m-1 p-1">Cancel</router-link>
              </div>
            </div>
           
          </div>
    <div class="col-md-6" v-else>
      <h4>You edited successfully!</h4>
      <div id="v-switch main" v-switch="role">
              <div id="v-case 1" v-case="'ROLE_ADMIN'">
               <router-link :to="'/admin'" class="btn btn-info m-1 p-1">Back</router-link>
                
              </div>
              <div id="v-case 1" v-case="'ROLE_MODERATOR'">
                <router-link :to="'/mod'" class="btn btn-info m-1 p-1">Back</router-link>
              </div>
              <div v-default>
                <router-link :to="'/user'" class="btn btn-info m-1 p-1">Back</router-link>
              </div>
            </div>
           
    </div>
  </div>
</div>
  
          
</template>
<script>
import TopicsDataService from "../services/TopicsDataService";
const user = JSON.parse(localStorage.getItem("user"));


export default {
  name: "edit-topic",
  data() {
    return {
      role: "",
      topic: {
        id: null,
        topicsubject: "",
        categorieId: "",
        userId: "",
      },
      submitted: false,
      
    };
  },
  methods: {
    // 1
    
    getTopic(id){
      console.log("edit cat id:", id);
      TopicsDataService.get(id)
      .then((response) => {
         console.log(response.data);
        this.topic = response.data;
        console.log(this.topic);
        console.log("i got everything");
      })
      .catch((e) => {
        console.log(e);
      });
    }, 
editTopic(){
    var data = {
      topicsubject: this.topic.topicsubject,
      categorieId: this.topic.categoriId,
      userId: this.topic.userId,
    };
    console.log(data);
    var id = this.topic.id;
    TopicsDataService.update(id, data).then((response) => {
        
        console.log(response.data);
        this.submitted = false;
      })
      .catch((e) => {
        console.log(e);
      });
},
  },
  mounted(){
    this.role = user.roles[0];
    this.getTopic(this.$route.params.id);
  }
};
</script>

<style >
.list-group li {
  cursor: pointer;
}


</style>