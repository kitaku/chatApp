<template>
  <div class="ui main container">
    <div class="ui grid">
      <div class="six wide column">
        <div class="ui card">
          <div class="image">
            <!-- <img src="../../static/image/sample.jpg"> -->
          </div>
          <div class="content">
            <a class="header"><i class="user icon"></i>{{user_name}}</a>
            <div class="meta">
              <!-- <span class="date">コメント　コメント　コメント　コメント　コメント　</span> -->
            </div>
            <div class="description">
              <!-- Kristy is an art director living in New York. -->
            </div>
          </div>
          <div class="extra content">
            <div class="ui login right floated fluid button" @click="doLogin">
              {{log_msg}}
            </div>
            <!-- <p class="message">{{message}}</p> -->
          </div>
        </div>
      </div>

      <div class="ten wide column">
        <div v-if="logined">
          <div class="ui fluid action input">
            <input type="text" placeholder="comment..." v-model="msg">
            <div class="ui button" @click="add">
              Post
            </div>
          </div>
        </div>

        <div class="ui divided items">
          <div class="item" v-for="(data, key) in json_data">
            <div class="content">
              <a class="header">{{data.user}}</a>
              <div class="description">
                {{data.msg}}
              </div>
              <div class="right floated meta">
                <span class="cinema">{{data.posted}}</span>
              </div>
              <!-- <div class="extra">
                <div class="ui right floated primary button">
                  Delete
                  <i class="right chevron icon"></i>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../plugins/firebase';

const axios = require('axios');

export default {
  data: function(){
    return {
      message : 'Home',
      log_msg : 'login',
      user_name : '',
      logined: true,
      msg:'',
      page: 0,
      num_per_page : 50,
      json_data: {},
    };
  },
  methods:{
    login:function(){
      var provider = new firebase.auth.GoogleAuthProvider();
      var self = this;
      firebase.auth().signInWithPopup(provider).then(function(result){
        console.log(result.user);
        self.user = result.user;
        self.user_name = result.user.displayName
        self.log_msg = 'Logout'

        let db = firebase.database();
        let ref = db.ref('chat');
        ref.orderByKey().limitToLast(self.num_per_page).on('value', function(snapshot){
          if (firebase.auth().currentUser != null) {
            let arr = [];
            let data = snapshot.val();
            for(let item in data){
              arr.unshift(data[item]);
            }
            console.log(arr);
            self.json_data = arr;
          } else {
            self.json_data = {};
          }
        });
      });
    },
    logout : function(){
      firebase.auth().signOut();
      this.user_name = '';
      this.json_data = {};
      this.log_msg = 'Login'
    },
    doLogin: function(){
      if (firebase.auth().currentUser == null) {
        this.login();
      } else {
        this.logout();
      }
    },
    add : function(){
      if (firebase.auth().currentUser == null) {
        alert('You cannot post without login');
        return;
      }
      let db = firebase.database();
      let user = firebase.auth().currentUser;
      console.log(user);
      let ref = db.ref('chat');
      let self = this;
      let d = new Date();
      let dstr = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      let id = d.getTime();
      let data = {
        msg:this.msg,
        user : user.displayName,
        posted : dstr,
      };
      firebase.database().ref('chat/' + id).set(data);
      this.msg = '';
      this.message = 'Your post finishied.';
    },
  },
  created: function(){
    if (firebase.auth().currentUser == null) {
      this.login();
    }
    console.log(firebase.auth().currentUser);
  },
}
</script>

<style>
.container{
  margin-top: 70px;
}
</style>
<!-- .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
} -->
