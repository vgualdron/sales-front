<template>
  <q-page class="flex flex-center q-mt-sm" style="display: block;">
    <validate-user />
  </q-page>
</template>

<script>
import ValidateUser from 'components/user/ValidateUser.vue';

export default {
  name: 'PageValidateCard',
  components: {
    ValidateUser,
  },
};
</script>
