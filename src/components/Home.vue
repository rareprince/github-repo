<template>
  <div class="main">

    <div class="bar">
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
      <nav>
        <router-link to="/Repository">Repository</router-link>
      </nav>
    </div>

    <div>
      <input type="text" v-model="username" placeholder="username" />
    </div>
    <div>
      <button @click="fetchRepo" :disabled="!username">Fetch Repository</button>
    </div>
  </div>
</template>

<script>

import { ref} from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: "Login",
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
       .then((data) => {
          repos.value = data;
          // Pass the fetched data as query parameter to the Repository route
          router.push({ name: 'Repository', query: { repos: JSON.stringify(data) } });
        })
        .catch((error) => console.log(error))
        .finally(() => {
          isLoading.value = false;
        });
    };

    

    return { username, repos, isLoading, fetchRepo }
  }
};

</script>

<style>
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
</style>