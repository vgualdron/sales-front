<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Validación de asociado"
      :data="[user]"
      :columns="columns"
      row-key="name"
      hide-header
      hide-bottom
    >
      <template v-slot:item="props">
        <q-card style="width: 100%">
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <template>
                  <q-item-label class="text-bold">
                    Tipo de documento
                  </q-item-label>
                  <q-item-label>
                    {{ props.row.documentType }}
                  </q-item-label>
                </template>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <template>
                  <q-item-label class="text-bold">
                    Número de documento
                  </q-item-label>
                  <q-item-label>
                    {{ props.row.documentNumber }}
                  </q-item-label>
                </template>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <template>
                  <q-item-label class="text-bold">
                    Nombre
                  </q-item-label>
                  <q-item-label>
                    {{ props.row.name }}
                  </q-item-label>
                </template>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <template>
                  <q-item-label class="text-bold">
                    Estado
                  </q-item-label>
                  <q-item-label>
                    <q-badge :color="props.row.active === 1 ? 'green' : 'red'">
                      {{ props.row.active === 1 ? 'ACTIVO' : 'INACTIVO' }}
                    </q-badge>
                  </q-item-label>
                </template>
              </q-item-section>
            </q-item>
          </q-list>
          </q-card>
      </template>
    </q-table>
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
      columns: [
        {
          name: 'documentType',
          required: true,
          label: 'Tipo documento',
          align: 'left',
          field: (row) => row.documentType,
          sortable: true,
        },
        {
          name: 'documentNumber',
          required: true,
          label: 'Número documento',
          align: 'left',
          field: (row) => row.documentNumber,
          sortable: true,
        },
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: 'active',
          required: true,
          label: 'Estado',
          align: 'left',
          field: (row) => row.active,
          sortable: true,
        },
      ],
    };
  },
  async mounted() {
    showLoading('Consultando ...', 'Por favor, espere', true);
    const { id } = this.$route.params;
    await this.getUser((id));
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
