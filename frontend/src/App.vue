<template>
  <div id="app">
    <AppHeader title="Livraria do Cowboy" />
    <div v-if="!showBookList">
      <button @click="voltar()">Voltar</button>
    </div>
    <div v-else>
      <b-row>
        <b-col>
           <b-form-input v-model="filtered" placeholder="Pesquise por nome"></b-form-input>
        </b-col>
        <b-col>
           <b-row>
             <b-col v-if="selected === 5">
               <select v-model="selectedCategory">
                <option v-for="(option, index) in listCategory" :key="index" v-bind:value="option">
                  {{ option }}
                </option>
              </select>
             </b-col>
             <b-col v-else></b-col>
             <b-col>
                <b-form-select v-model="selected" :options="options"></b-form-select>
             </b-col>
           </b-row>
        </b-col>
      </b-row>      
    </div>
    <AppFolderBook v-if="showBookList" @update-cart="updateCart" :books="listFiltered" @update-likes="likes" />
    <AppDetailsBook v-else :book="bookDetails" />
    <div v-if="showBookList" class="mt-3">
      <b-pagination v-model="currentPage" :total-rows="rows" align="center"></b-pagination>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFolderBook from './components/AppFolderBook.vue'
import AppDetailsBook from './components/AppDetailsBook.vue'
import services from './services'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFolderBook,
    AppDetailsBook
  },
  data () {
    return {
      books: [],
      bookDetails: {},
      showBookList: true,
      filtered: '',
      listCategory: [],
      selected: null,
      selectedCategory: null,
      options: [
          { value: null, text: 'Filtros' },
          { value: 1, text: 'Melhores Avaliados' },
          { value: 2, text: 'Em estoque' },
          { value: 3, text: 'Ordem Alfabética' },
          { value: 4, text: 'Livros Curtidos' },
          { value: 5, text: 'Por Categoria' }
        ],
      rows: 0,
      currentPage: 1
    }
  },
  computed: {
    listFiltered: function () {
      let list = this.books
      list = this.applyFilter(list)
      return list
    }
  },
  methods: {
    applyFilter(list) {
      if (!this.selected) {
         list = this.filteredByName(list) 
      }

      if (this.selected === 1) {
        list = this.filteredByLikes(list)
        list = this.filteredByName(list)
      }

      if (this.selected === 2) {
        list = this.filteredByStocks(list)
        list = this.filteredByName(list)
      }

      if (this.selected === 3) {
        list = this.filteredByOrderAlfabetica(list)
        list = this.filteredByName(list)
      }

      if (this.selected === 4) {
        list = this.filteredBylikesForMe(list)
       // list = this.filteredByName(list)
      }

      if (this.selected === 5 && this.selectedCategory) {
        list = this.filteredByCategory(list)
        list = this.filteredByName(list)
      }
      return this.pagination(this.filteredByName(list), this.currentPage, 8)
    },
     async loadBooks () {
        this.books = await services.getBooks()
        this.getCategory()
     },
     updateCart(book) {
      this.bookDetails = book
      this.showBookList = false
    },
    voltar () {
       this.bookDetails = {}
      this.showBookList = true
    },
    getCategory () {
      let category = this.books.map((item) => {
        return item.category
      })
      this.listCategory = category.filter(function(el, i) {
        return category.indexOf(el) === i;
    })
    },
    filteredByName(list) {
      var self = this
      return list.filter(function (book) {
        return book.name.toLowerCase().indexOf(self.filtered.toLowerCase()) !== -1
      })
    },
    filteredByCategory(list) {
      var self = this
      return list.filter(function (book) {
        return book.category.toLowerCase().indexOf(self.selectedCategory.toLowerCase()) !== -1
      })
    },
    filteredByLikes (list) {
        let maxLike = this.getMaxLike(list)
         return list.filter(function (book) {
           if (book.users_who_liked.length) {
              return book.users_who_liked.length >= maxLike
           }         
        })      
    },
    getMaxLike (list) {
      let arrayMaxLikes = []
      list.filter(function (book) {
        if (book.users_who_liked.length) {
         arrayMaxLikes.push(book.users_who_liked.length) 
        }
      })
      return Math.max(...arrayMaxLikes)
    },
    filteredByStocks (list) {
      return list.filter(book => book.stock > 0)      
    },
    filteredByOrderAlfabetica (list) {
      return list.sort(function(a, b) {
         if (a.name > b.name) {
           return 1
         }

         if (a.name < b.name) {
           return -1
         }
         return 0
      })      
    },
    filteredBylikesForMe (list) {      
      return list.filter(function (book) {
        if (book.users_who_liked.length) {
        if (book.users_who_liked.indexOf('me') !== -1) {
            return book
          }
        }
      })
    },    
    likes (index) {
      let that = this    
      if (that.books[index].users_who_liked.indexOf('me') === -1) {
        that.books[index].users_who_liked.push('me')
      } else {
         that.books[index].users_who_liked.splice(that.books[index].users_who_liked.indexOf('me'), 1);
      }
    },
    pagination (items, pageActual, limitItems) { 
      let result = []
      let totalPage = Math.ceil( items.length / limitItems )
      this.rows = Math.ceil( items.length * 2 )
      let count = ( pageActual * limitItems ) - limitItems
      let delimiter = count + limitItems
      if(pageActual <= totalPage) {
        for(let i=count; i<delimiter; i++) {
          if(items[i] != null) {
            result.push(items[i])
          }
          count++
        }
      }
      return result
    }
  },
  mounted () {
    this.loadBooks()
  }
}
</script>
<style>
body {
  padding: 25px;
  background-color: white;
  color: black;
  font-size: 25px;
}
.dark-mode {
  background-color: black ;
  color: white;
}

.dark-mode input{
  background-color: black ;
  color: white;
}

.dark-mode select{
  background-color: black ;
  color: white;
}

.dark-mode input:focus{
  background-color: black ;
  color: white;
}

.dark-mode a{
  color: white;
}

.dark-mode .card  {
  background-color: #ccc;
  font-size: 16px;
}
.dark-mode .card p {
  background-color: #ccc;
  color:white;
  font-size: 16px;
}

.dark-mode button {
  background-color: black;
  color: white;
}
 
</style>


