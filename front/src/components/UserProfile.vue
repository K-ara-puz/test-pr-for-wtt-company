<template>
  <div class="user">
    <div class="user__data">
        <h1 class="user__name">User id: {{ $attrs.id }}</h1>
        <button @click="signOut()">Sign out!</button>
    </div>
    <div class="user__tests">
      <form class="user__tests__test" v-for="(test, index) in userTests" :key="index">
        <h2>Your {{ ++index }} test !</h2>
        <div
          class="user__tests__test__wrapp"
          v-for="section in test.questions"
          :key="section.question"
        >
          <div class="user__tests__test__wrapp__question">{{ section.question }}</div>
          <div class="user__tests__test__wrapp__answer">
            Answer:
            <input type="text" />
          </div>
        </div>
        <span v-if="test.testResult" class="user__tests__test__result">Result: {{ test.testResult.rightAnswers }} / {{ test.testResult.allQuestionsCount }}</span>
        <button v-else type="button" @click="finishTest(index)">Finish Test</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import router from '../../router/router';
import { onMounted, useAttrs, reactive } from 'vue';

let userTests = reactive(new Array);
let userId = useAttrs().id;

onMounted(() => {
  loadTests();
});
const loadTests = () => {
  axios
    .post('http://localhost:3000/api/users/getTests', {
      userId: userId
    })
    .then((res) => {
      res.data.forEach(question => {
        if (!userTests.find(el => el.test_id === question.test_id)) {
          let test = {
            test_id: question.test_id,
            questions: []
          }
          test.questions.push({
            question: question.test_question
          })
          userTests.push(test)
        } else {
          let test = userTests.find(el => el.test_id == question.test_id);
          test.questions.push({
            question: question.test_question
          })
        }
      })
    })
}
const finishTest = (testIndex) => {
  let testsForms = document.querySelectorAll('form')
  let targetTestForm = testsForms[testIndex - 1];
  let answers = targetTestForm.querySelectorAll('input');
  const allQuestionsCount = answers.length;
  let testData = {};
  let answerIndex = 0;

  answers.forEach((answer) => {
    if (answer.value != '') {
      testData[++answerIndex] = answer.value
    }
  });

  if (Object.keys(testData).length < 1) return

  axios.post('http://localhost:3000/api/users/getTestsResult', {
    testNumber: testIndex,
    test: testData,
    userId: userId,
    allQuestionsCount,
  })
  .then((res) => {
    userTests[testIndex - 1].testResult = res.data
  })
}
const signOut = () => {
    router.push({name: 'loginPage'})
}

</script>
<style lang="scss">
.user {
  padding: 10px;
  &__data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        background-color: red;
        max-width: 200px;
        margin: 10px 5px;
        padding: 5px 20px;
        color: aliceblue;
        border-radius: 5px;
        border: 1px solid rgb(255, 128, 128);
    }
  }
  &__tests {
    &__test {
      display: flex;
      flex-direction: column;
      &__wrapp {
        margin: 15px 5px;
        display: flex;
        column-gap: 15px;
        input {
          max-width: 50px;
        }
      }
      span {
        margin: 10px 5px;
      }
      button {
        background-color: green;
        max-width: 200px;
        margin: 10px 5px;
        padding: 5px 20px;
        color: aliceblue;
        border-radius: 5px;
        border: 1px solid rgb(0, 55, 0);
        @media (max-width: 576px) {
          max-width: 100%;
        }
      }
      &__result {
        color: rgb(130, 0, 0);
        font-size: 2rem;
        font-weight: bold;
      }
    }
  }
}
</style>
