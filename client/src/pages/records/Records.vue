//@ts-ignore
<script setup lang="ts">
import TopNavbar from './../../components/TopNavBar.vue';
import { userToken } from '../../composables/userSession';
import { axiosClient } from './../../libs/axios';
console.log('userToken');
console.log(userToken);
axiosClient.defaults.headers.common.Authorization = 'bearer ' + userToken.value;


</script>
<template>
    <div>
        <TopNavbar />
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="9"><v-text-field placeholder="Search by amount" v-model="like"></v-text-field></v-col>
                <v-col cols="3"><v-btn @click="getDataFromApi">Search!</v-btn></v-col>
            </v-row>
        </v-container>
        <v-data-table-server :headers="headers" :items="items" :items-length="totalItems" :loading="loading"
            :items-per-page="5" item-value="name" class="elevation-1" @update:options="options = $event">
            <template v-slot:item.id="{ item }">
                <v-btn @click="deleteRecord(item)">DELETE</v-btn>
            </template>
        </v-data-table-server>
    </div>
</template>
  
<script lang="ts">

export default {
    data() {
        return {
            like: '',
            totalItems: 0,
            items: [],
            loading: true,
            options: {},
            headers: [
                {
                    title: 'Date',
                    align: 'center',
                    sortable: true,
                    key: 'date',
                },
                {
                    title: 'OperationType',
                    align: 'center',
                    sortable: true,
                    key: 'operation_type',
                },
                {
                    title: 'UserBalance',
                    key: 'user_balance',
                    align: 'center',
                    sortable: false,
                },
                {
                    title: 'Amount',
                    key: 'amount',
                    align: 'center',
                    sortable: false,
                },
                {
                    title: 'OperationResult',
                    key: 'operation_response',
                    align: 'center',
                    sortable: false,
                },
                {
                    title: '',
                    key: 'id',
                    value: 'id',
                    align: 'center',
                    sortable: false,
                },
            ],
        }
    },
    watch: {
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true,
        },
    },
    methods: {
        async deleteRecord(item: any) {
            console.log(item.value.id);
            try {
                await axiosClient.post(`/operation/${item.value.id}/delete`);
                const itemIndex = this.items.findIndex((record: any) => record.id == item.value.id);
                this.items.splice(itemIndex, 1);
            } catch (error) {
                console.log('unable to delete the record');
                alert('unable to delete the record');
            }

        },
        async getDataFromApi() {
            this.loading = true;
            this.getItems().then((data: any) => {
                this.items = data.items;
                this.totalItems = data.total;
                this.loading = false;
            })
        },
        async getItems() {
            const { sortBy = [], page, itemsPerPage } = this.options as { sortBy: any[], page: number, itemsPerPage: number };

            try {
                const sort = [...sortBy.values()]?.[0]?.key;
                const order = [...sortBy.values()]?.[0]?.order;
                const urlParams = new URLSearchParams();

                urlParams.append('page', String(page || 1));
                urlParams.append('perPage', String(itemsPerPage || 5));
                if (sort) {
                    urlParams.append('sort', sort);
                    urlParams.append('order', order.toUpperCase());
                }

                if (this.like) {
                    urlParams.append('like', this.like);
                }

                console.log(urlParams.toString());
                const url = '/operation/report?' + urlParams.toString();
                let response = await axiosClient.get(url);
                return response.data;
            } catch (error) {
                console.log(error);
                return [];
            }

        },
    },
}
</script>