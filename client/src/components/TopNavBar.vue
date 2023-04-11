<script setup lang="ts">
import { userToken } from '../composables/userSession';
</script>
<template>
    <v-toolbar dark prominent class="mb-4">
        <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/calculator" icon class="mr-1 text-grey-darken-3"> <v-icon>mdi-calculator</v-icon></router-link>
        <router-link to="/records" icon class="mr-2 text-grey-darken-3"> <v-icon>mdi-file-table-box</v-icon></router-link>
        <v-btn icon class="mr-1 text-grey-darken-3" @click="logout"> <v-icon>mdi-logout</v-icon> </v-btn>
    </v-toolbar>
</template>
<script lang="ts">
export default {
    beforeCreate() {
        if (!userToken.value) {
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
        logout() {
            userToken.value = null;
            this.$router.push({ name: 'login' });
        }
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    }
}
</script>
