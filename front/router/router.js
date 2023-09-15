import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import LoginForm from '../src/components/LoginForm.vue';
import UserProfile from '../src/components/UserProfile.vue';

const routes = [
  { path: '/', name: "loginPage", component: LoginForm },
  { path: '/users/:id', name: "user", component: UserProfile, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;