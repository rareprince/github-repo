<template>
  <div>
    <div class="bar">
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
      <nav>
        <router-link to="/Repository">Repository</router-link>
      </nav>
    </div>

    <div class="repository">
      <table class="table">
        <thead class="table-header">
          <tr>
            <td class="header__item">S/N</td>
            <td class="header__item">Name</td>
            <td class="header__item">URL</td>
            <td class="header__item">Language</td>
          </tr>
        </thead>
        <tbody class="tab-body">
          <tr v-for="(repo, i) in displayedRepos" :key="repo.id">
            <td>{{ i + 1 }}</td>
            <td>{{ repo.name }}</td>
            <td><a :href="repo.html_url" target="_blank">{{ repo.url }}</a></td>
            <td>{{ repo.language }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="isLoading">Loading...</p>
    </div>
    <div>
       <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
      <button @click="nextPage" :disabled="endIndex >= repos.length">Next</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Repository",
  data() {
    return {
      repos: [],
      isLoading: false,
      currentPage: 1,
      displayedRepos: [],
      itemsPerPage: 5,
    };
  },
  created() {
    this.isLoading = true;
    // Parse the repos data from the query parameter
    const reposData = this.$route.query.repos;
    if (reposData) {
      this.repos = JSON.parse(reposData);
    }
    this.isLoading = false;
    this.updateDisplayRepos(); //call method to update displayed repos
  },

  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.startIndex + this.itemsPerPage;
    },
    totalPages() {
      return Math.ceil(this.repos.length / this.itemsPerPage);
    },
     pages() {
   const pagesArray = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    },
  },
  methods: {
    nextPage() {
      this.currentPage++;
      this.updateDisplayRepos(); // call method to update displayed repos
    },
    prevPage() {
      this.currentPage--;
      this.updateDisplayRepos();  // call method to update displayed repos
    },
    goToPage(page) {
      this.currentPage = page;
      this.updateDisplayRepos();
    },
    updateDisplayRepos() {
       // update the displayed repos
      // slice the repos array based on the current page and update the displayed repos
      this.displayedRepos = this.repos.slice(this.startIndex, this.endIndex);
    },
  },
};



</script>

<style>
.repository {
  margin-top: 30px;
  background-color: white;
  padding: 15px;

}


.table {
  width: 100%;
  border: 1px solid;
}

.table-header {
  width: 100%;
  background: #000;
  padding-top: 10px;
  color: white;

}

td {
  border: 1px solid;

}

.table-data,
.header__item {
  flex: 1 1 20%;
  text-align: center;
}

.header__item {
  text-transform: uppercase;
}
</style>