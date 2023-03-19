<template>
    <div>
        <div class="repository">
            <table>
                <thead>
                    <tr>
                        <td>S/N</td>
                        <td>Name</td>
                        <td>URL</td>
                        <td>Language</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(repo, i) in repos" :key="repo.id">
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
</template>

<script>
import { ref } from 'vue';
export default {
    name: "Repository",
    setup() {
        const username = ref("");
        const repos = ref([]);
        const isLoading = ref(false);

        const fetchRepo = () => {
            if (!username.value) {
                return ("Please Enter Your Username");
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