<template>
  <CRow>
    <CCol>
      <!--UPLOAD-->
      <form
        enctype="multipart/form-data"
        novalidate
        v-if="isInitial || isSaving"
      >
        <!-- <h4>Upload images</h4> -->
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">
            Drag your file(s) here to begin<br />
            or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files. Please wait...</p>
        </div>
      </form>
      <!--SUCCESS-->
      <div v-if="isSuccess">
        <p>{{ uploadedFiles.length }} file(s) successfully uploaded.</p>
        <p>
          <a href="javascript:void(0)" @click="reset()"
            >Click to upload again</a
          >
        </p>
        <ul class="list-unstyled">
          <li v-for="item in uploadedFiles">
            <img
              :src="item"
              class="img-responsive img-thumbnail"
              :alt="item.originalName"
            />
          </li>
        </ul>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <p>Uploaded failed.</p>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>

      <div>
        <p>
          If you don't have a sample file, you can download from below link:
        <ul>
          <li><a href="http://localhost:5000/sample/xray1.png" target="_blank">Xray Image 1</a></li>
          <li><a href="http://localhost:5000/sample/xray2.png" target="_blank" >Xray Image 2</a></li>
          <li><a href="http://localhost:5000/sample/xray3.png" target="_blank" >Xray Image 3</a></li>
        </ul>
        </p>
      </div>
    </CCol>
  </CRow>
</template>

<script>
// swap as you need
//import { upload } from './file-upload.fake.service'; // fake service
import { upload } from "../../lib/file-upload.service"; // real service
import { wait } from "../../lib/utils";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "WidgetsXray",
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "image",
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server

      this.currentStatus = STATUS_SAVING;

      upload(formData)
        .then(wait(15000)) // DEV ONLY: wait for 1.5s
        .then((x) => {
          console.log("success");
          console.log(x);

          this.uploadedFiles = [].concat(x.data.url);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch((err) => {
          console.log("failed");

          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      // save it
      this.save(formData);
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<style lang="scss">
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>