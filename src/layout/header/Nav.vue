<template>
  <nav>
    <ul list-none flex="~ wrap" m="0 l-4" p-0>
      <template v-for="menu in topMenu.data">
        <li v-if="menu.children && menu.children.length > 0" m-1 p="x-3 y-2" rd-2>
          <b> {{ menu.name }} </b>
          <div class="popup" absolute ml--3 pt-3 hidden>
            <div style="background-color: var(--background-primary)" p-2 rd-2>
              <template v-for="child in menu.children">
                <a v-if="4 === child.type" :href="child.path" flex="~ col" p="x-8 y-2" rd-2> {{ child.name }} </a>

                <RouterLink v-else :to="child.path">
                  <div class="router-link" p="x-8 y-2" rd-2>{{ child.name }}</div>
                </RouterLink>
              </template>
            </div>
          </div>
        </li>

        <RouterLink v-else :to="menu.path">
          <li :class="{ active: topMenu.active === menu.id }" m-1 p="x-3 y-2" rd-2>
            <b> {{ menu.name }} </b>
          </li>
        </RouterLink>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useNavMenuStore } from '@/pinia';
import { stringify } from 'qs';

const { topMenu } = storeToRefs(useNavMenuStore());

function listMenus() {
  request
    .get('/fan/sys/menu/listMenus?' + stringify({ position: 'top', type: [1, 2, 4], flag: 'Y' }))
    .then((res) => {
      topMenu.value.data = res.data;
    })
    .catch(() => {});
}
listMenus();
</script>

<style scoped lang="scss">
nav ul li:hover,
li.active {
  background-color: var(--background-trans);

  .popup {
    display: block;
  }
}

.popup {
  a {
    color: var(--text-bright);

    &:hover {
      background-color: var(--background-trans);
    }
  }

  .router-link:hover {
    background-color: var(--background-trans);
  }
}
</style>
