<template>
    <b-container>
        <div class="row">
            <div v-for="(book, index) in books" 
                :key="index" 
                 class="card green">
                <img class="image" @click="teste(book)" :src="book.cover_picture" alt="money" />
                <h5>{{book.name}}</h5>
                <div class="card-botton">
                  <p>{{book.author}}</p>
                  <p>{{book.category}} 
                  <span class="likebtn" @click="likes(index)">
                    <b-icon-heart-fill v-if="setLikes(index)"></b-icon-heart-fill>
                    <b-icon-heart v-else></b-icon-heart>
                  </span>
                </p>
                </div>
            </div>
            </div>
    </b-container>
</template>
<script>
export default {
    name: 'folderBook',
    props: {
        books: {
            type: Array,
            default: function () {
                return []
            }
        }
    }, methods: {
        teste (book) {
            this.$emit('update-cart', book)
        },
        likes (index) {
          this.$emit('update-likes', index)
        },
        setLikes (index) {
          if (this.books[index].users_who_liked.length) {
            if (this.books[index].users_who_liked.indexOf('me') === -1) {
              return false
            }
            return true
          }
        }
    }
}
</script>
<style>
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(50, 50, 50, 0.22);
  max-width: 300px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  height: 550px;
  transition: all 0.3s ease-out;
}

.card img:hover {
  transform: translateY(-5px);
  cursor: pointer;
}
 
.card p {
  color: #a3a5ae;
  font-size: 16px;
}
 
.image {
  float: right;
  max-width: 100%;
  max-height: 100vh;
}

.likebtn {
  margin-left: 15px;
  color: blue;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.card-botton {
   position: absolute;
   width: 90%;
   height: 15%;
   bottom: 0;

}
</style>
