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
          <tr v-for="(repo, i) in repos" :key="repo.id">
            <td>{{ i + 1 }}</td>
            <td>{{ repo.name }}</td>
            <td><a :href="repo.html_url" target="_blank">{{ repo.url }}</a></td>
            <td>{{ repo.language }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="isLoading">Loading...</p>
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