<template>
  <q-page class="">
    <table-news-approved />
  </q-page>
</template>

<script>
import TableNewsApproved from 'components/newsApproved/TableNewsApproved.vue';

export default {
  components: { TableNewsApproved },
  data() {
    return {
    };
  },
  name: 'PageNewsApproved',
};
</script>
