<template>
    <div class="user">
        <h1 class="user__name">User id: {{ $attrs.id }}</h1>
        <div class="user__tests">
            <div class="user__tests__test"
                v-for="(test, index) in userTests"
                :key="index"
            >
                <h2>Your {{ ++index }} test !</h2>
                <div class="user__tests__test__wrapp"
                    v-for="section in test.questions"
                    :key="section.question"
                >
                <!-- {{ section }} -->
                    <div class="">{{ section.question }}</div>
                    <!-- <div class="">{{ section.answer }}</div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { onMounted, useAttrs } from 'vue';

let userTests = reactive(new Array);

const loadTests = () => {
    console.log('loooooooad!');
    axios.post('http://localhost:3000/api/users/getTests', {
        userId: useAttrs().id
    })
    .then( res => {
        console.log(res.data);
        if (res.data) {
            res.data.forEach(element => {
                userTests.push(element)
            });
        }
    })
}
onMounted(() => {
    loadTests();
})
</script>
<style lang="scss">
    .user {
        padding: 10px;
    }
</style>