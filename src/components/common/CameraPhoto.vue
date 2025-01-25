<template>
  <div class="q-pa-xs">
    <div class="row q-ma-xs">
      <div class="col-12 text-center">
        <q-btn
          v-if="urlFile && type === 'read'"
          round
          icon="location_on"
          class="q-mb-xs"
          color="primary"
          @click="openInGoogleMaps">
        </q-btn>
        <img
          v-if="urlFile"
          :src="urlFile"
          @click="showModalPreview = true;"
          width="250rem" />
        <p v-else class="text-subtitle1 text-center">No se ha cargado archivo</p>
        <q-banner
          v-if="item && item.status == 'rechazado' && item.observation"
          class="bg-red text-white q-ma-md">
          {{ item.status }}: {{ item.observation }}
        </q-banner>
        <q-banner
          v-else-if="item && item.status == 'aprobado'"
          class="bg-green text-white q-ma-md">
          {{ item.status }}
        </q-banner>
        <template v-if="item && showApprove && type === 'read'">
          <div class="q-mt-md">
            <q-icon size="xs" name="edit" />
            {{ item.observation ? item.observation : 'Haz click para agregar una observación' }} <br>
            <q-popup-edit :value="item.observation" v-slot="scope" buttons
              @input="val => save('observation', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </div>
          <q-btn
            label="Aprobar"
            color="primary"
            ref="camera"
            class="q-mt-sm"
            :disable="item.status == 'aprobado'"
            @click="save('status', 'aprobado')"
          />
          <q-btn
            label="Rechazar"
            color="primary"
            ref="camera"
            class="q-mt-sm q-ml-sm"
            :disabled="!item.observation"
            outline
            @click="save('status', 'rechazado')"
          />
        </template>
        <q-btn
          v-else-if="(!item && type !== 'read') || (item && item.status !== 'aprobado' && type !== 'read')"
          label="Agregar foto"
          color="primary"
          icon="add_a_photo"
          ref="camera"
          class="q-mt-sm"
          @click="initCamera" />
      </div>
    </div>
    <q-dialog
      v-if="showModal"
      v-model="showModal"
      persistent>
      <q-card style="max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Tomar foto</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <div class="row q-mb-md">
            <div class="col-12 text-center">
              <q-select
                v-model="selectedDeviceId"
                :options="videoInputDevices"
                label="Seleccione la camara"
                option-value="deviceId"
                option-label="label"
                @input="openCamera"
                color="primary"
                outlined />
            </div>
          </div>
          <div class="row">
            <div v-show="showVideo" class="col-12 text-center video-container">
              <video autoplay width="250rem" ref="video" id="video"></video>
              <div class="overlay-square"></div>
            </div>
            <div v-if="!showVideo" class="col-12 text-center">
              <img src="" ref="imgTakePhoto" width="250rem" />
            </div>
          </div>
          <div class="row q-ma-sm">
            <div class="col-12 text-center">
              <q-btn
                v-if="!cameraStart"
                label="Dar permiso de camara"
                color="primary"
                icon="camera"
                ref="camera"
                :disabled="!enableCamera"
                @click="startCamera" />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <div class="row text-center q-pa-md">
          <q-btn
            label="Tomar"
            color="primary"
            :disabled="!showVideo || !cameraStart"
            @click="takePhoto" />
          <q-btn
            label="Cambiar"
            color="primary"
            class="col q-ml-sm"
            @click="showVideo = true"
            :disabled="showVideo"
            outline
          />
          <q-btn
            label="Guardar"
            color="primary"
            class="col q-ml-sm"
            :disabled="showVideo"
            @click="sendImage"
          />
        </div>
      </q-card>
    </q-dialog>
    <modal-preview-file
      v-if="showModalPreview"
      v-model="showModalPreview"
      :url="urlFile"
      :type="'image'"
      :showBtnCancel="false"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalPreviewFile from 'components/common/ModalPreviewFile.vue';
import fileTypes from '../../store/modules/file/types';
import { showNotifications } from '../../helpers/showNotifications';
import { showLoading } from '../../helpers/showLoading';

export default {
  name: 'CameraPhoto',
  data() {
    return {
      item: null,
      urlFile: null,
      videoInputDevices: [],
      selectedDeviceId: null,
      enableCamera: false,
      cameraStart: false,
      imageCapture: null,
      track: null,
      image: null,
      blob: null,
      showVideo: true,
      showModal: false,
      showModalPreview: false,
      location: null, // Para almacenar la ubicación actual
      googleMapUrl: '', // La URL para el iframe de Google Maps
      error: null,
    };
  },
  props: {
    config: {},
    type: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: 'creado',
      required: false,
    },
    showApprove: {
      type: Boolean,
      default: true,
      require: false,
    },
  },
  async mounted() {
    await this.fetchFile();
  },
  computed: {
    ...mapState(fileTypes.PATH, [
      'responseMessages',
      'status',
    ]),
    file() {
      const f = this.image.split('base64,');
      return f.length > 1 ? f[1] : f[0];
    },
    extension() {
      const { type } = this.blob;
      const ext = type.split('/');
      return ext.length > 1 ? ext[1] : ext[0];
    },
    link() {
      if (this.responseMessages && this.responseMessages.length > 0) {
        return `${process.env.URL_FILES}${this.responseMessages[0].text}`;
      }
      return '';
    },
  },
  components: {
    ModalPreviewFile,
  },
  methods: {
    ...mapActions(fileTypes.PATH, {
      saveFile: fileTypes.actions.SAVE_FILE,
      updateFile: fileTypes.actions.UPDATE_FILE,
      getFile: fileTypes.actions.GET_FILE,
    }),
    openInGoogleMaps() {
      if (this.item) {
        const { latitude, longitude } = this.item;
        // Crear la URL para abrir en Google Maps
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        console.log(googleMapsUrl);
        // Abrir la URL en una nueva pestaña o ventana del navegador
        window.open(googleMapsUrl, '_blank');
      } else {
        this.error = 'Location not available. Please allow location access.';
        const e = [{
          text: 'Error',
          detail: this.error,
        }];
        this.showNotification(e, false, 'top-right', 5000);
      }
    },
    async getLocation() {
      try {
        if (navigator.geolocation) {
          // Usamos una promesa para envolver el método getCurrentPosition
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          // Almacenamos la latitud y longitud
          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        } else {
          this.error = 'Unable to retrieve location. Please allow access.';
          const e = [{
            text: 'Error',
            detail: this.error,
          }];
          this.showNotification(e, false, 'top-right', 5000);
        }
      } catch (err) {
        this.error = 'Geolocation is not supported by this browser.';
        const e = [{
          text: 'Error',
          detail: this.error,
        }];
        this.showNotification(e, false, 'top-right', 5000);
      }
    },
    async initCamera() {
      this.showModal = true;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const e = [{
          text: 'Error al acceder a la camara',
          detail: 'getUserMedia is not supported in this browser.',
        }];
        this.showNotification(e, false, 'top-right', 5000);
      } else {
        this.enableCamera = true;
        await this.getVideoInputDevices();
      }
    },
    showNotification(messages, status, align, timeout) {
      showNotifications(messages, status, align, timeout);
    },
    async getVideoInputDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        this.videoInputDevices = devices.filter((device) => device.kind === 'videoinput');
        if (this.videoInputDevices.length > 0) {
          this.selectedDeviceId = this.videoInputDevices.length === 2 ? this.videoInputDevices[1] : this.videoInputDevices[0];
          this.openCamera(this.selectedDeviceId);
        }
      } catch (error) {
        console.error('Error fetching video input devices', error);
        const e = [{
          text: 'Error al acceder a la camara',
          detail: error.message,
        }];
        this.showNotification(e, false, 'top-right', 5000);
      }
    },
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('video');
        video.srcObject = stream;
        window.location.reload();
      } catch (error) {
        const e = [{
          text: 'Error al acceder a la camara',
          detail: error.message,
        }];
        this.showNotification(e, false, 'top-right', 5000);
      }
    },
    async openCamera(deviceId) {
      navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: {
            exact: deviceId && deviceId.deviceId ? deviceId.deviceId : deviceId,
          },
        },
      }).then((mediaStream) => {
        this.cameraStart = true;
        this.$refs.video.srcObject = mediaStream;
        this.track = mediaStream.getVideoTracks();
        this.imageCapture = new ImageCapture(this.track[0]);
      });
    },
    async takePhoto() {
      showLoading('Tomando foto ...', 'Por favor, espere', true);
      this.showVideo = false;
      await this.imageCapture.takePhoto()
        .then((blob) => {
          createImageBitmap(blob);
          this.blob = blob;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = async () => {
            this.image = reader.result;
            this.$refs.imgTakePhoto.src = this.image;
          };
        }).catch((error) => console.log(error));
      this.$q.loading.hide();
    },
    async sendImage() {
      showLoading('Guardando ...', 'Por favor, espere', true);
      await this.getLocation();
      const {
        name,
        storage,
        modelId,
        modelName,
      } = this.config;

      const {
        latitude,
        longitude,
      } = this.location;

      await this.saveFile({
        name,
        storage,
        modelName,
        modelId,
        type: 'image',
        file: this.file,
        extension: this.extension,
        status: this.state,
        latitude,
        longitude,
      });
      this.$q.loading.hide();
      if (this.responseMessages && this.status) {
        this.showModal = false;
        await this.fetchFile();
        const { id } = this.item;
        this.$emit('savedFile', { id, name });
      }
      this.showNotification(this.responseMessages, this.status, 'top-right', 5000);
    },
    async fetchFile() {
      showLoading('consultando archivo ...', 'Por favor, espere', true);
      const {
        name,
        modelId,
        modelName,
      } = this.config;

      const response = await this.getFile({
        name,
        modelName,
        modelId,
      });

      this.$q.loading.hide();

      if (response.data) {
        this.item = response.data;
        this.urlFile = `${process.env.URL_FILES}${this.item.url}`;
      }
    },
    async save(field, value) {
      const {
        name,
      } = this.config;

      this.item[field] = value.value ? value.value : value;
      await this.updateFile(this.item);
      if (this.responseMessages && this.status) {
        this.$emit('updateStatus', { name, field, value });
        await this.fetchFile();
      }
    },
  },
};
</script>
<style scoped>
  .video-container {
    position: relative;
    display: inline-block;
  }
  img {
    display: block;
    max-width: 640px;
    margin: auto;
    cursor: pointer;
  }
  video {
    display: block;
    max-width: 640px;
    margin: auto;
  }
  .overlay-square {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    border: 2px solid red;
    transform: translate(-50%, -50%);
    pointer-events: none; /* Make sure the square doesn't block interactions with the video */
  }
  .q-banner {
    width: 210px;
  }
</style>
