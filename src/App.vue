<script>
import { ref } from 'vue';
import router from './router';
import Login from './components/Home.vue';

export default {
  router,
  components: { Login },
  setup() {
    const username = ref("");
    const repos = ref([]);
    const isLoading = ref(false);

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
  },
};

</script>

<template>
  <div class="body">
    <div class="header">
      <h1>GitHub Fetch Repository</h1>
    </div>
    <section>
        <router-view />
      
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



@media (min-width: 1024px) {
  div {
    display: flex;
    place-items: center;
    flex-direction: column;
  }

}
</style>
