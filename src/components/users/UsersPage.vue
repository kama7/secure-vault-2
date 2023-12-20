<template>
  <div class="users-page">
    <!--search bar-->
    <user-search class="q-mt-md" v-model="searchText"/>

    <!--user profile list-->
    <div
      v-for="(user,index) in filteredUsers"
      class="q-my-lg"
      :key="index"
    >
      <user-profile-card :user="user">
        <!--user posts-->
        <template #posts>
          <div class="flex no-wrap justify-between">
            <div class="text-subtitle1">Posts</div>

            <q-btn
              round
              :icon="arePostsByUserIdVisible[user.id]
                ? 'keyboard_arrow_up'
                : 'keyboard_arrow_down'"
              color="primary"
              @click="togglePosts(user.id)"
              dense
              no-caps
              flat
              :loading="arePostsByUserIdVisible.hasOwnProperty(user.id)
                && !arePostsByUserIdVisible[user.id]"
            />
          </div>

          <template v-if="arePostsByUserIdVisible[user.id]">
            <user-post
              v-for="(post, index) in usersStore.posts[user.id]"
              :key="index"
              :post="post"
              class="q-my-md"
            />
          </template>
        </template>
      </user-profile-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useUsersStore} from 'stores/useUsersStore';
import UserProfileCard from 'components/users/common/UserProfileCard.vue';
import {User} from 'components/users/types/User';
import UserPost from 'components/users/posts/UserPost.vue';
import UserSearch from 'components/users/common/UserSearch.vue';

const usersStore = useUsersStore()

/**
 * search string to filter users by name
 */
const searchText = ref<string>('');

/**
 * object with key as userId and value as boolean
 */
const arePostsByUserIdVisible = ref<{
  [key: User['id']]: boolean
}>({});

/**
 * filter users from store based on searchText
 */
const filteredUsers = computed<User[]>(() => (
  usersStore.users.filter((user) => user.name.toLowerCase().includes(searchText.value.toLowerCase()))
))

/**
 * fetch the posts by userId and then toggles the posts visibility
 * fetching posts every time when opened
 * @param id userId
 */
const togglePosts = async (id: User['id']): Promise<void> => {
  // hide the posts if userId key already exists
  if(arePostsByUserIdVisible.value[id]){
    delete arePostsByUserIdVisible.value[id]

    return;
  }

  // run the respective loader while fetching posts
  arePostsByUserIdVisible.value[id] = false;

  await usersStore.fetchPosts(id);

  // stop the loader after posts fetched
  arePostsByUserIdVisible.value[id] = true;
}

const init = async () => {
  await usersStore.fetchUsers();
}

init();
</script>

<style scoped lang="scss">
.users-page {
  margin-left: auto;
  margin-right: auto;
  @media (min-width: $breakpoint-md-min) {
    width: 40rem;
  }
}
</style>
