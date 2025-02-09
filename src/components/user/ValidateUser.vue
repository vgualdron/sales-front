<template>
  <div class="q-pa-md">
    {{ user }}
  </div>
</template>
<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import userTypes from '../../store/modules/user/types';
import { showNotifications } from '../../helpers/showNotifications';
import { showLoading } from '../../helpers/showLoading';

export default {
  components: {
  },
  data() {
    return {
      route: '/validate-user',
      name: 'Usuarios',
      data: [],
      polling: null,
    };
  },
  async mounted() {
    showLoading('Consultando ...', 'Por favor, espere', true);
    const { id } = this.$route.params;
    await this.getUser(atob(id));
    this.$q.loading.hide();
  },
  computed: {
    ...mapState(userTypes.PATH, [
      'users',
      'responseMessages',
      'status',
      'user',
    ]),
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
  },
  methods: {
    ...mapActions(userTypes.PATH, {
      getUser: userTypes.actions.GET_USER,
    }),
    showNotification(messages, status, align, timeout) {
      showNotifications(messages, status, align, timeout);
    },
  },
};
</script>
