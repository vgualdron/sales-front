<template>
  <div id="div-container-cv">
    <div class="row text-center">
      <q-btn
        v-if="id && !onlyTable"
        icon="content_copy"
        label="Copiar tabla de datos"
        color="primary"
        @click="captureImage"
        class="q-mb-md"/>
      <q-btn
        v-if="id && !onlyTable"
        icon="download"
        label="descargar pdf"
        color="primary"
        @click="downloadPdf"
        class="q-mb-md q-ml-md"/>
    </div>
    <q-markup-table
      id="div-container-table-cv"
      class="cv-table q-mb-sm"
      separator="cell"
      dense
    >
      <tbody>
        <tr class="bg-blue-3">
          <td class="text-bold text-center" colspan="4">
            ARCHIVO PERSONAL
          </td>
          <td class="text-bold text-center" colspan="1">
            RUTA
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.list_name }}
          </td>
          <td class="text-bold text-center" colspan="1">
            ZONA
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.sectorName }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-5 text-bold text-center" colspan="1">
            CLIENTE
          </td>
          <td class="text-bold text-center" colspan="3">
            {{ item.name }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            TELEFONO
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.phone }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            CONDICIÓN
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.period }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            PRESTAMO
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ formatPrice(item.quantity) }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            FECHA
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ formatDate(item.date) }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            PRESTÓ
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.lent_by_name }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            AUTORIZÓ
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.approved_by_name }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            DIRECCIÓN CASA
          </td>
          <td class="bg-yellow text-bold text-center" colspan="5">
            {{ item.address_house }}, {{ item.districtHouseName }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            TIPO VIVIENDA
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.type_house }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            OCUPACIÓN
          </td>
          <td class="text-bold text-center" colspan="5">
            {{ item.occupation }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
          </td>
          <td class="text-bold text-center" colspan="1">
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            DIRECCIÓN TRABAJO
          </td>
          <td class="bg-yellow text-bold text-center" colspan="5">
            {{ item.address_work }}, {{ item.districtWorkName }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
          </td>
          <td class="text-bold text-center" colspan="1">
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-5 text-bold text-center" colspan="1">
            FIADOR
          </td>
          <td class="text-bold text-center" colspan="3">
            {{ item.guarantor_name }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            TELEFONO
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.guarantor_phone }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            OCUPACIÓN
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.guarantor_occupation }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            DIRECCIÓN
          </td>
          <td class="bg-yellow text-bold text-center" colspan="5">
            {{ item.guarantor_address }}, {{ item.guarantor_district_name }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            PARENTESCO
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.guarantor_relationship }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-5 text-bold text-center" colspan="1">
            REF FAMILIAR 1
          </td>
          <td class="text-bold text-center" colspan="5">
            {{ item.family_reference_name }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            TELEFONO
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.family_reference_phone }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            DIRECCIÓN
          </td>
          <td class="bg-yellow text-bold text-center" colspan="5">
            {{ item.family_reference_address }}, {{ item.family_reference_district_name }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            PARENTESCO
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.family_reference_relationship }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-5 text-bold text-center" colspan="1">
            REF FAMILIAR 2
          </td>
          <td class="text-bold text-center" colspan="5">
            {{ item.family2_reference_name }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            TELEFONO
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.family2_reference_phone }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            DIRECCIÓN
          </td>
          <td class="bg-yellow text-bold text-center" colspan="5">
            {{ item.family2_reference_address }}, {{ item.family2_reference_district_name }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            PARENTESCO
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.family2_reference_relationship }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            CUENTA PRINCIPAL
          </td>
          <td class="text-bold text-center" colspan="2">
            {{ item.account_type }}: {{ item.account_number }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            CUENTA TERCERO
          </td>
          <td class="text-bold text-center" colspan="2">
            {{ item.account_type_third }}: {{ item.account_number_third }}, {{ item.account_name_third }}
          </td>
          <td class="bg-blue-1 text-bold text-center" colspan="1">
            CUENTA ACTIVA
          </td>
          <td class="text-bold text-center" colspan="1">
            {{ item.account_active }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-5 text-bold text-center" colspan="1">
            REF EXTRA
          </td>
          <td class="text-bold text-center text-red" colspan="7">
            {{ item.extra_reference }}
          </td>
        </tr>
        <tr class="">
          <td class="bg-blue-5 text-bold text-center" colspan="1">
            OBSERVACIÓN
          </td>
          <td class="text-bold text-center text-red" colspan="7">
            {{ item.observation }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-card v-if="id && !onlyTable" class="q-mt-lg">
      <q-card-section class="row q-pb-none">
        <div class="text-h6">ARCHIVOS DE CLIENTE</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="scroll flex">
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CASA CLIENTE</p>
          <camera-photo
            :config="{
              name: 'FOTO_CASA_CLIENTE',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="wrap-text text-subtitle1 text-weight-bold text-center">VIDEO TOCANDO CASA CLIENTE</p>
          <camera-video
            :config="{
              name: 'VIDEO_TOCANDO_CASA_CLIENTE',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CLIENTE</p>
          <camera-photo
            :config="{
              name: 'FOTO_CLIENTE',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CEDULA CLIENTE FRONTAL</p>
          <camera-photo
            :config="{
              name: 'FOTO_CEDULA_CLIENTE_FRONTAL',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CEDULA CLIENTE POSTERIOR</p>
          <camera-photo
            :config="{
              name: 'FOTO_CEDULA_CLIENTE_POSTERIOR',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO LETRA CLIENTE</p>
          <camera-photo
            :config="{
              name: 'FOTO_LETRA_CLIENTE',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO FIRMANDO LETRA CLIENTE</p>
          <camera-photo
            :config="{
              name: 'FOTO_FIRMANDO_LETRA_CLIENTE',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CERTIFICADO DE TRABAJO CLIENTE</p>
          <camera-photo
            :config="{
              name: 'FOTO_CERTIFICADO_TRABAJO_CLIENTE',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO RECIBO CASA CLIENTE</p>
          <camera-photo
            :config="{
              name: 'FOTO_RECIBO_CASA_CLIENTE',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO RED SOCIAL</p>
          <camera-photo
            :config="{
              name: 'FOTO_RED_SOCIAL',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">VIDEO AUTORIZA CUENTA TERCERO</p>
          <camera-video
            :config="{
              name: 'VIDEO_AUTORIZA_CUENTA_TERCERO',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            :showApprove="false"
            type="read"
          />
        </div>
        <div class="div-container" v-if="validatedPermissions.voucher.status && (item.status === 'aprobado' || item.status === 'consignado')">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO VOUCHER</p>
          <camera-photo
            :config="{
              name: 'FOTO_VOUCHER',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card v-if="id && !onlyTable" class="q-mt-lg">
      <q-card-section class="row q-pb-none">
        <div class="text-h6">ARCHIVOS DE REFERENCIA FAMILIAR 1</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="scroll flex">
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CASA REF FAMILIAR 1</p>
          <camera-photo
            :config="{
              name: 'FOTO_CASA_REFERENCIA_FAMILIAR_1',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">VIDEO REFERENCIA FAMILIAR 1</p>
          <camera-video
            :config="{
              name: 'VIDEO_REFERENCIA_FAMILIAR_1',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CEDULA FRONTAL REF FAMILIAR 1</p>
          <camera-photo
            :config="{
              name: 'FOTO_CEDULA_FRONTAL_REFERENCIA_FAMILIAR_1',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CEDULA POSTERIOR REF FAMILIAR 1</p>
          <camera-photo
            :config="{
              name: 'FOTO_CEDULA_POSTERIOR_REFERENCIA_FAMILIAR_1',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card v-if="id && !onlyTable" class="q-mt-lg">
      <q-card-section class="row q-pb-none">
        <div class="text-h6">ARCHIVOS DE REFERENCIA FAMILIAR 2</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="scroll flex">
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CASA REF FAMILIAR 2</p>
          <camera-photo
            :config="{
              name: 'FOTO_CASA_REFERENCIA_FAMILIAR_2',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">VIDEO REFERENCIA FAMILIAR 2</p>
          <camera-video
            :config="{
              name: 'VIDEO_REFERENCIA_FAMILIAR_2',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CEDULA FRONTAL REF FAMILIAR 2</p>
          <camera-photo
            :config="{
              name: 'FOTO_CEDULA_FRONTAL_REFERENCIA_FAMILIAR_2',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CEDULA POSTERIOR REF FAMILIAR 2</p>
          <camera-photo
            :config="{
              name: 'FOTO_CEDULA_POSTERIOR_REFERENCIA_FAMILIAR_2',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card v-if="id && !onlyTable" class="q-mt-lg">
      <q-card-section class="row q-pb-none">
        <div class="text-h6">ARCHIVOS DE FIADOR</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="scroll flex">
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CASA FIADOR</p>
          <camera-photo
            :config="{
              name: 'FOTO_CASA_FIADOR',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO FIADOR</p>
          <camera-photo
            :config="{
              name: 'FOTO_FIADOR',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CEDULA FIADOR FRONTAL</p>
          <camera-photo
            :config="{
              name: 'FOTO_CEDULA_FIADOR_FRONTAL',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CEDULA FIADOR POSTERIOR</p>
          <camera-photo
            :config="{
              name: 'FOTO_CEDULA_FIADOR_POSTERIOR',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO LETRA FIADOR</p>
          <camera-photo
            :config="{
              name: 'FOTO_LETRA_FIADOR',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO FIRMANDO LETRA FIADOR</p>
          <camera-photo
            :config="{
              name: 'FOTO_FIRMANDO_LETRA_FIADOR',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO CERTIFICADO DE TRABAJO FIADOR</p>
          <camera-photo
            :config="{
              name: 'FOTO_CERTIFICADO_TRABAJO_FIADOR',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
        <div class="div-container">
          <p class="text-subtitle1 text-weight-bold text-center">FOTO RECIBO CASA FIADOR</p>
          <camera-photo
            :config="{
              name: 'FOTO_RECIBO_CASA_FIADOR',
              storage: 'news',
              modelName: 'news',
              modelId: id
            }"
            type="read"
            :showApprove="false"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import moment from 'moment';
import domtoimage from 'dom-to-image';
import { Notify } from 'quasar';
import { mapState, mapActions } from 'vuex';
import CameraPhoto from 'components/common/CameraPhoto.vue';
import CameraVideo from 'components/common/CameraVideo.vue';
import newTypes from '../../../store/modules/new/types';
import userTypes from '../../../store/modules/user/types';
import { showNotifications } from '../../../helpers/showNotifications';
import { havePermission } from '../../../helpers/havePermission';

export default {
  data() {
    return {
      step: 0,
      stepTmp: 0,
      showStateCases: true,
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      require: true,
    },
    onlyTable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(newTypes.PATH, {
      item: 'new',
      newStatus: 'status',
      newResponseMessages: 'responseMessages',
    }),
    ...mapState(userTypes.PATH, {
      user: 'user',
      users: 'users',
    }),
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    validatedPermissions() {
      const statusReview = havePermission('visit.review');
      const statusVoucher = havePermission('visit.voucher');
      return {
        review: {
          title: statusReview ? 'Revisar visita' : 'No tiene permisos para revisar visitas',
          status: statusReview,
        },
        voucher: {
          title: statusVoucher ? 'Agregar voucher' : 'No tiene permisos para agregar voucher',
          status: statusVoucher,
        },
      };
    },
  },
  async created() {
    await this.getItem();
  },
  methods: {
    ...mapActions(newTypes.PATH, {
      getNew: newTypes.actions.GET_NEW,
    }),
    ...mapActions(userTypes.PATH, {
      getUser: userTypes.actions.GET_USER,
    }),
    showNotification(messages, status, align, timeout) {
      showNotifications(messages, status, align, timeout);
    },
    formatPrice(val) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val);
    },
    formatDateToDay(date) {
      moment.locale('es');
      return moment(date).format('dddd');
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    formatHour(date) {
      return moment(date).format('hh:mm A');
    },
    captureImage() {
      const element = document.getElementById('div-container-table-cv');

      domtoimage.toBlob(element).then((blob) => {
        // Crea un ClipboardItem a partir del blob
        const item = new ClipboardItem({ 'image/png': blob });

        // Copia el item al portapapeles
        navigator.clipboard.write([item]).then(() => {
          Notify.create({
            message: 'Imagen copiada en el portapapeles',
            icon: 'content_copy',
            color: 'green',
            timeout: 5000,
            textColor: 'white',
            classes: 'glossy',
          });
        }).catch((err) => {
          Notify.create({
            message: `Error al copiar la imagen al portapapeles: ${err}`,
            icon: 'content_copy',
            color: 'red',
            timeout: 5000,
            textColor: 'white',
            classes: 'glossy',
          });
          console.log(err);
        });
      }).catch((error) => {
        Notify.create({
          message: `Error al generar la imagen: ${error}`,
          icon: 'content_copy',
          color: 'red',
          timeout: 5000,
          textColor: 'white',
          classes: 'glossy',
        });
        console.log(error);
      });
    },
    downloadPdf() {
      // Obtén el contenido HTML del elemento
      const quasarStyles = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quasar@1.9.0/dist/quasar.min.css">';
      const element = document.getElementById('div-container-cv');
      const clonedElement = element.cloneNode(true);

      // Elimina todos los botones del contenido clonado
      const buttons = clonedElement.querySelectorAll('button');
      buttons.forEach((button) => button.remove());

      // Elimina todos los div con role="alert" del contenido clonado
      const alerts = clonedElement.querySelectorAll('div[role="alert"]');
      alerts.forEach((alert) => alert.remove());

      // Convierte el contenido clonado en HTML
      const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            ${quasarStyles}
              <style>
                .cv-table {
                  display: block;
                  border: solid 1px black;
                  border-collapse: collapse;
                  padding: 20px;
                }
                .cv-table td {
                  border: solid 1px black;
                }
              </style>
          </head>
          <body>
            ${clonedElement.innerHTML}
          </body>
        </html>
      `;

      // Crea un formulario dinámico para enviar los datos por POST
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://micomercio.com.co/dompdf/generate.php';
      form.target = '_blank'; // Abre en una nueva ventana

      // Crea un campo de texto oculto para el contenido HTML
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'content'; // Nombre del parámetro que recibirá el servidor
      input.value = htmlContent;
      // Crea un campo de texto oculto para el nombre del file
      const inputName = document.createElement('input');
      inputName.type = 'hidden';
      inputName.name = 'name'; // Nombre del parámetro que recibirá el servidor
      inputName.value = this.item.name;

      // Añade el input al formulario y envíalo
      form.appendChild(input);
      form.appendChild(inputName);
      document.body.appendChild(form);
      form.submit();

      // Limpia el formulario después de enviarlo
      document.body.removeChild(form);
    },
    async getItem() {
      await this.getNew(this.id);
    },
  },
  components: {
    CameraPhoto,
    CameraVideo,
  },
};
</script>
<style scoped>
  p {
    display: block;
    max-width: 640px;
    margin: auto;
  }
  .table-container {
    text-align: center;
  }
  .markup-table {
    display: block;
    max-width: 250px;
    min-width: 250px;
    margin: auto;
  }

  .cv-table {
    display: block;
    border: solid 1px black;
  }
  .cv-table td {
    border: solid 1px black;
  }

  .z-index-btn {
    z-index: 20;
  }
  .q-card__section > .text-h6 {
    border: none;
  }
  .wrap-text {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: normal;
  }
  .div-container {
    border: solid 1px rgb(145, 140, 140);
    margin: 10px;
    padding: 5px;
    border-radius: 10px;
    width: 300px;
  }
  .q-banner {
    display: none !important;
  }
</style>
