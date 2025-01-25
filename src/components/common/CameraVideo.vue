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
        <video
          v-if="urlFile"
          :src="urlFile"
          width="250rem"
          controls>
        </video>
        <p v-else class="text-subtitle1 text-center">No se ha cargado archivo</p>
        <q-banner
          v-if="item && item.status == 'rechazado' && item.observation"
          class="bg-red text-white q-ma-md">
          {{ item.status }}: {{ item.observation }}
        </q-banner>
        <q-banner
          v-if="item && item.status == 'aprobado'"
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
          label="Agregar video"
          color="primary"
          icon="video_call"
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
          <div class="text-h6">Grabar video</div>
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
                @input="startRecording"
                color="primary"
                outlined />
            </div>
          </div>
          <div class="video-recorder">
            <div v-show="!videoURL || isRecording" class="col-12 text-center video-container">
              <video autoplay muted width="250rem" ref="video" id="video"></video>
              <div class="overlay-square"></div>
            </div>
            <div v-if="videoURL && !isRecording">
              <video width="250rem" :src="videoURL" controls></video>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <div class="row text-center q-pa-md">
          <q-btn
            :disabled="isRecording"
            @click="startRecording(selectedDeviceId)"
            color="primary">
              Iniciar
          </q-btn>
          <q-btn
            @click="stopRecording"
            :disabled="!isRecording"
            color="primary"
            class="q-ml-sm"
            outline>
              Parar
          </q-btn>
          <q-btn
            :disabled="isRecording || !videoURL"
            label="Guardar"
            color="primary"
            class="q-ml-sm"
            @click="send"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import fileTypes from '../../store/modules/file/types';
import { showNotifications } from '../../helpers/showNotifications';
import { showLoading } from '../../helpers/showLoading';

export default {
  data() {
    return {
      item: null,
      urlFile: null,
      videoInputDevices: [],
      selectedDeviceId: null,
      mediaRecorder: null,
      chunks: [],
      videoURL: null,
      isRecording: false,
      video: null,
      blob: null,
      showModal: false,
      location: null, // Para almacenar la ubicación actual
      googleMapUrl: '', // La URL para el iframe de Google Maps
      error: null,
    };
  },
  props: {
    config: {
      type: Object,
    },
    type: {
      type: String,
      default: '',
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
      const f = this.video.split('base64,');
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
        }
      } catch (err) {
        this.error = 'Geolocation is not supported by this browser.';
      }
    },
    showNotification(messages, status, align, timeout) {
      showNotifications(messages, status, align, timeout);
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
        await this.getVideoInputDevices();
      }
    },
    async getVideoInputDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        this.videoInputDevices = devices.filter((device) => device.kind === 'videoinput');
        if (this.videoInputDevices.length > 0) {
          this.selectedDeviceId = this.videoInputDevices.length === 2 ? this.videoInputDevices[1] : this.videoInputDevices[0];
        }
      } catch (error) {
        console.error('Error fetching video input devices', error);
      }
    },
    async startRecording(deviceId) {
      try {
        this.videoURL = null;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: {
              exact: deviceId && deviceId.deviceId ? deviceId.deviceId : deviceId,
            },
          },
          audio: true,
        });
        this.isRecording = true;
        this.$refs.video.srcObject = stream;
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.chunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = this.handleStop;

        this.mediaRecorder.start();
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    },
    stopRecording() {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.$refs.video.srcObject.getTracks().forEach((track) => track.stop());
    },
    handleStop() {
      const blob = new Blob(this.chunks, { type: 'video/mp4' });
      this.videoURL = URL.createObjectURL(blob);
      this.blob = blob;
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        this.video = reader.result;
      };
      this.chunks = [];
    },
    async send() {
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
        type: 'video',
        file: this.file,
        extension: this.extension,
        status: 'creado',
        latitude,
        longitude,
      });
      this.$q.loading.hide();
      if (this.responseMessages && this.status) {
        this.showModal = false;
        this.$emit('savedFile', { name });
        await this.fetchFile();
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
  .video-recorder {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .video-container {
    position: relative;
    display: inline-block;
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
