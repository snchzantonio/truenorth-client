<script setup lang="ts">
import { axiosClient } from './../libs/axios';
import { userToken } from '../composables/userSession';
import { ref } from 'vue';

console.log(userToken);
axiosClient.defaults.headers.common.Authorization = 'bearer ' + userToken.value;
const simpleCalc = ref({
    operator: '+',
    operands: new Array<number>(),
    currentValue: '',
    result: 0
});


async function getRandomString() {
    try {
        const { data } = await axiosClient.post('/operation/random-string/');
        if (data.status) {
            simpleCalc.value.result = data.value;
        }
    } catch (error) {
        console.log(error);
    }
}

async function calculate() {
    const postBody = {
        operator: simpleCalc.value.operator,
        operands: [...simpleCalc.value.operands.values()],
    }
    console.log(axiosClient.defaults.headers.common);
    console.log(postBody);
    try {
        const { data } = await axiosClient.post('/operation/simple/', postBody);
        console.log(data);
        if (data.status) {
            simpleCalc.value.result = data.value;
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <v-container>
        <v-row>
            Stack:<br>
            <v-col>
                {{ simpleCalc.operands.join(', ') }}
                <br>
                {{ simpleCalc.currentValue }}
            </v-col>
            <v-col>
                Current operation:<br>
                {{ simpleCalc.operator }}
            </v-col>
        </v-row>
        <v-row>
            Result: <br>
            <v-col>{{ simpleCalc.result }}</v-col>
        </v-row>
        <v-row>
            <v-col> <v-btn @click="() => simpleCalc.currentValue += '7'">7</v-btn> </v-col>
            <v-col> <v-btn @click="() => simpleCalc.currentValue += '8'">8</v-btn> </v-col>
            <v-col> <v-btn @click="() => simpleCalc.currentValue += '9'">9</v-btn> </v-col>
            <v-col> <v-btn @click="() => simpleCalc.operator = '+'">+</v-btn> </v-col>
        </v-row>
        <v-row>
            <v-col><v-btn @click="() => simpleCalc.currentValue += '4'">4</v-btn></v-col>
            <v-col><v-btn @click="() => simpleCalc.currentValue += '5'">5</v-btn></v-col>
            <v-col><v-btn @click="() => simpleCalc.currentValue += '6'">6</v-btn></v-col>
            <v-col><v-btn @click="() => simpleCalc.operator = '-'">-</v-btn></v-col>
        </v-row>
        <v-row>
            <v-col><v-btn @click="() => simpleCalc.currentValue += '1'">1</v-btn></v-col>
            <v-col><v-btn @click="() => simpleCalc.currentValue += '2'">2</v-btn></v-col>
            <v-col><v-btn @click="() => simpleCalc.currentValue += '3'">3</v-btn></v-col>
            <v-col><v-btn @click="() => simpleCalc.operator = '/'">/</v-btn></v-col>
        </v-row>
        <v-row>
            <v-col><v-btn
                    @click="() => simpleCalc.currentValue = simpleCalc.currentValue[0] == '-' ? simpleCalc.currentValue.slice(1) : '-' + simpleCalc.currentValue">+/-</v-btn></v-col>
            <v-col><v-btn @click="() => simpleCalc.currentValue += '0'">0</v-btn></v-col>
            <v-col><v-btn
                    @click="() => { if (!simpleCalc.currentValue.includes('.')) simpleCalc.currentValue += '.' }">.</v-btn></v-col>
            <v-col><v-btn @click="() => simpleCalc.operator = '√'">√</v-btn></v-col>
        </v-row>
        <v-row>
            <v-col><v-btn
                    @click="() => simpleCalc.currentValue = simpleCalc.currentValue.slice(0, -1)">Delete</v-btn></v-col>
            <v-col><v-btn @click="() => {
                simpleCalc.operands.push(Number(simpleCalc.currentValue));
                simpleCalc.currentValue = '';
            }">ADD</v-btn></v-col>
        </v-row>
        <v-row>
            <v-col><v-btn @click="() => {
                simpleCalc.currentValue = '';
                simpleCalc.operands = [];
            }">CLEAR!</v-btn></v-col>
            <v-col>
                <v-btn @click="calculate">CALCULATE!</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn @click="getRandomString">GET RANDOM STRING!</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>