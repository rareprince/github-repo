<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

export default {
  setup() {
    const username = ref("");
    const repos = ref([]);
    const isLoading = ref(false);
    const router = useRouter();


    const fetchRepo = () => {
      if (!username.value) {
        return (alert("Please Enter Your Username"));
      }

      isLoading.value = true;
      fetch(`https://api.github.com/users/${username.value}/repos`)
        .then((response) => response.json())
        .then((data) => { repos.value = data })
        .catch((error) => console.log(error))
        .finally(() => { isLoading.value = false });
    };

    return { username, repos, isLoading, fetchRepo }
  }
};

</script>

<template>
  <div class="body">
    <div class="header">
      <h1>GitHub Fetch Repository</h1>
    </div>
    <div>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
      <nav>
        <router-link to="/repository">Repository</router-link>
      </nav>
    </div>
    <section>
      <div class="main">
        <div>
          <input type="text" v-model="username" placeholder="username" />
        </div>
        <div>
          <button @click="fetchRepo" :disabled="!username">Fetch Repository</button>
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
              <tr v-for="(repo, i) in repos" :key="repo.id" c>
                <td>{{ i + 1 }}</td>
                <td>{{ repo.name }}</td>
                <td>{{ repo.html_url }}</td>
                <td>{{ repo.language }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="isLoading">Loading...</p>
        </div>
        <router-view />
      </div>
    </section>
  </div>
</template>

<style scoped>
.body {
  line-height: 1.5;
  margin: auto;
  position: relative;

}

h1 {
  font-weight: 900;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  text-align: center;
}

.main {
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 10px;
  padding: 50px 100px;
  background: rgb(243, 243, 243);
}

input {
  border-radius: 15px;
  padding: 8px;
  margin-bottom: 20px;
  font-size: 18px;
  border: none;
}

button {
  display: flex;
  padding: 10px 15px;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  color: white;
  background: #6225E6;
  transition: 1s;
  box-shadow: 6px 6px 0 black;
  transform: skewX(-15deg);
}

button:focus {
  outline: none;
}

button:hover {
  transition: 0.5s;
  box-shadow: 10px 10px 0 #FBC638;
}

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

@media (min-width: 1024px) {
  div {
    display: flex;
    place-items: center;
    flex-direction: column;
  }

}
</style>
