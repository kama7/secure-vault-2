import { defineStore } from 'pinia';
import { ref } from 'vue';
import {Post, User} from 'components/users/types/User';
import { api } from 'boot/axios';
import { notify } from 'boot/notify';

export const useUsersStore = defineStore('user', () => {
  const users = ref<User[]>([]);
  const posts = ref<{
    [key: User['id']]: Post[]
  }>([]);

  const fetchUsers = async () => {
    await api.get<User[]>('users')
      .then(response => {
        users.value = response.data;
      })
      .catch((error) => {
        notify({
          type: 'negative',
          message: error.message
        })
      })
  }

  const fetchPosts = async (userId: User['id']) => {
    await api.get<Post[]>(`posts?userId=${userId}`)
      .then(response => {
        posts.value[userId] = response.data;
      })
      .catch((error) => {
        notify({
          type: 'negative',
          message: error.message
        })
      })
  }

  return  {
    users,
    posts,
    fetchUsers,
    fetchPosts
  }
});
