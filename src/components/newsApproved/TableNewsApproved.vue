<template>
  <div class="q-pa-md">
    <div class="row q-mt-md">
      <div class="col-10 text-center">
        <q-input
          debounce="400"
          color="primary"
          v-model="filter"
          class="q-ml-xs"
          placeholder="Buscar"
          clearable
          dense
          outlined
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div
        class="col-2
        text-center"
      >
      <q-btn
        round
        icon="refresh"
        class=""
        color="primary"
        title="Click para refrescar la tabla"
        @click="listNewsMounted">
      </q-btn>
      </div>
    </div>
    <q-table
      v-if="!isLoading"
      :grid="$q.screen.xs"
      :data="dataTable"
      :columns="columns"
      :filter="filter"
      :pagination="pagination"
      separator="cell"
      class="q-mt-md"
      dense
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <upload-image
              :config="{
                name: 'FOTO_VOUCHER',
                storage: 'news',
                modelName: 'news',
                modelId: props.row.id
              }"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-reject="props">
        <q-td :props="props">
          <!-- <q-icon size="xs" name="edit" />
            {{ props.row.observation }}
            <q-popup-edit :value="props.row.observation" v-slot="scope" buttons
              @input="val => saveDataNew('observation', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit> -->
          <q-btn
            v-if="props.row.id && props.row.diary_id"
            class=""
            color="orange"
            label="DEVOLVER"
            title="Click para devolver a visita"
            @click="changeStatusReject(props.row)">
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-video="props">
        <q-td :props="props">
          <camera-video
            :config="{
              name: 'VIDEO_AUTORIZA_CUENTA_TERCERO',
              storage: 'news',
              modelName: 'news',
              modelId: props.row.id
            }"
            :showApprove="false"
            type="read"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-cv="props">
        <q-td :props="props">
          <q-btn
            class=""
            color="primary"
            label="Ver"
            title="Click para ver la hoja de vida"
            @click="openCv(props.row)">
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-quantity="props">
        <q-td :props="props">
          {{ formatPrice(props.row.quantity) }}
        </q-td>
      </template>
    </q-table>
    <cv
      v-model="showModalCv"
      v-if="showModalCv"
      :row="newSelected" />
  </div>
</template>
<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import UploadImage from 'components/common/UploadImage.vue';
import CameraVideo from 'components/common/CameraVideo.vue';
import Cv from 'components/new/Cv.vue';
import newTypes from '../../store/modules/new/types';
import diaryTypes from '../../store/modules/diary/types';
import { showNotifications } from '../../helpers/showNotifications';
import { showLoading } from '../../helpers/showLoading';
import { formatDateWithTime } from '../../helpers/formatDate';

export default {
  components: {
    UploadImage,
    CameraVideo,
    Cv,
  },
  data() {
    return {
      obj: {},
      type: 'C',
      route: '/new',
      name: 'Información de nuevos',
      columns: [
        {
          name: 'reject',
          label: 'Devolver',
          align: 'center',
          visible: false,
        },
        {
          name: 'actions',
          label: 'Cargar voucher',
          align: 'center',
          visible: false,
        },
        {
          name: 'video',
          label: 'Video de Aut',
          align: 'center',
          visible: false,
        },
        {
          name: 'cv',
          align: 'center',
          label: 'Hoja de vida',
          field: 'cv',
          sortable: true,
          visible: true,
        },
        {
          name: 'name',
          align: 'left',
          label: 'Cliente',
          field: 'name',
          style: 'max-width: 300px',
          classes: 'ellipsis',
          sortable: true,
          visible: true,
        },
        {
          name: 'quantity',
          align: 'left',
          label: 'Valor',
          field: 'quantity',
          sortable: true,
          visible: true,
        },
        {
          name: 'account',
          align: 'left',
          label: 'Cuenta',
          field: (row) => row,
          format: (row) => `${row.account_active === 'principal' ? row.account_type : row.account_type_third}: ${row.account_active === 'principal' ? row.account_number : row.account_number_third}`,
          sortable: true,
          visible: true,
        },
        {
          name: 'updated_at',
          align: 'left',
          label: 'Fecha',
          field: 'updated_at',
          format: (row) => `${this.formatDate(row.updated_at)}`,
          sortable: true,
          visible: true,
        },
      ],
      pagination: {
        rowsPerPage: 0,
        sortBy: 'updated_at',
        descending: true,
      },
      filter: '',
      data: [],
      polling: null,
      showModalCv: false,
      isLoading: false,
      newSelected: null,
    };
  },
  async mounted() {
    this.listNewsMounted();
    this.pollData();
  },
  computed: {
    ...mapState(newTypes.PATH, [
      'news',
      'responseMessages',
      'status',
      'new',
    ]),
    dataTable() {
      const data = this.news.map((element) => ({
        ...element,
        date: formatDateWithTime(element.date),
      }));
      return data;
    },
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  methods: {
    ...mapActions(newTypes.PATH, {
      listNews: newTypes.actions.LIST_NEWS,
      completeDataNew: newTypes.actions.COMPLETE_DATA_NEW,
    }),
    ...mapActions(diaryTypes.PATH, {
      completeDataDiary: diaryTypes.actions.COMPLETE_DATA_DIARY,
    }),
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    openCv(row) {
      this.newSelected = { ...row };
      this.showModalCv = true;
    },
    formatPrice(val) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val);
    },
    async pollData() {
      this.polling = setInterval(async () => {
        await this.listNewsMounted();
      }, 60000);
    },
    async listNewsMounted() {
      this.isLoading = true;
      showLoading('Cargando ...', 'Por favor, espere', true);
      await this.listNews(['aprobado']);
      if (this.status === false) {
        this.showNotification(this.responseMessages, this.status, 'top-right', 5000);
        this.data = [];
      }
      this.$q.loading.hide();
      this.isLoading = false;
    },
    /* async saveDataNew(field, value) {
      showLoading('Guardando ...', 'Por favor, espere', true);
      const item = {
        id: this.item.id,
      };
      item[field] = value.value ? value.value : value;
      await this.completeDataNew(item);
      await this.getItem();
      this.$q.loading.hide();
    }, */
    async changeStatusReject(obj) {
      this.$q.dialog({
        title: 'Devolver a visita',
        message: 'Está seguro que desea devolver a pendiente?',
        ok: {
          push: true,
        },
        cancel: {
          push: true,
          color: 'negative',
          text: 'adsa',
        },
        persistent: true,
      }).onOk(async () => {
        this.obj = obj;
        showLoading('Guardando ...', 'Por favor, espere', true);
        await this.completeDataNew({
          id: obj.id,
          status: 'pendiente',
        });

        await this.completeDataDiary({
          id: obj.diary_id,
          status: 'cancelada',
        });

        if (this.status === true) {
          await this.listNewsMounted();
        }
        this.$q.loading.hide();
        this.showNotification(this.responseMessages, this.status, 'top-right', 5000);
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
    },
    showNotification(messages, status, align, timeout) {
      showNotifications(messages, status, align, timeout);
    },
  },
};
</script>
<style scoped>
  .q-banner {
    width: 95% !important;
  }
  .wrap-text {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: normal;
  }
</style>
