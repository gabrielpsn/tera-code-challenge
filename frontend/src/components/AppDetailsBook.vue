<template>
    <b-container>
        <div class="row folder">
        <div class="col-sm-6">
            <h3>{{book.name}}</h3>
            <p>{{book.author}}</p>
            <p>{{book.category}}</p>
            <span style="font-size: 12px;">
                {{book.description}}
            </span>
        </div>
        <div class="col-sm-6">
            <b-card-img :src="book.cover_picture" alt="Image" class="rounded-0"></b-card-img>
        </div>
    </div>
    </b-container>
</template>
<script>
export default {
    name: 'folderBook',
    props: {
        book: {
            type: Object,
            default: function () {
                return {}
            }
        }
    }
}
</script>
<style>
.folder {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(50, 50, 50, 0.22);
  padding: 5px;
  width: 60%;
  height: 100vh;
  transition: all 0.3s ease-out;
}


</style>
