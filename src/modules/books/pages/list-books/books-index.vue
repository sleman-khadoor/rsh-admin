<template>
  <v-data-table
    :headers="headers"
    :items="books"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    density="default"
    fixed-header=true
    fixed-footer=true
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.author" label="Author"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchBooks">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'BooksView',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: 'Author',
          align: 'start',
          sortable: false,
          key: 'author',
        },
        { title: 'Title', key: 'title' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      books: [],
      editedIndex: -1,
      editedItem: {
        author: '',
        title: 0,
      },
      defaultItem: {
        author: '',
        title: 0,
      },
    }),

    computed: {
      formTitle () {
        console.log('ldldld');
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      // ...mapGetters('Books', ['books']),
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

     created () {
      // this.initialize()
       this.fetchBooks();
    },

    methods: {
      ...mapActions('Books',['fetchBooks', 'addNewBook', 'updateBook', 'deleteBook']),

      // async initialize () {
      //   // this.books = [
      //   //   {
      //   //     author: 'Gingerbread',
      //   //     title: 356,
      //   //   },
      //   //   {
      //   //     author: 'Jelly bean',
      //   //     title: 375,
      //   //   },
      //   //   {
      //   //     author: 'Lollipop',
      //   //     title: 392,
      //   //   },
      //   //   {
      //   //     author: 'Honeycomb',
      //   //     title: 408,
      //   //   },
      //   //   {
      //   //     author: 'Donut',
      //   //     title: 452,
      //   //   },
      //   //   {
      //   //     author: 'KitKat',
      //   //     title: 518,
      //   //   },
      //   // ]
      //   console.log('hiiiiii');
      //   await this.fetchBooks() 
      // },

      editItem (item) {
        this.editedIndex = this.books.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.books.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.books.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.books[this.editedIndex], this.editedItem)
        } else {
          this.books.push(this.editedItem)
        }
        this.close()
      },
    },

  }
</script>

<style>
.v-table {
  background: rgb(245, 245, 245);
  font-size: 0.875rem;
  margin-top: 20px;
}
.v-data-table {
  width: 1000px;
}
.v-data-table-header__content {
  font-weight: bold;
}
</style>


 