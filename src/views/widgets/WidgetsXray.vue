<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <!-- <CCardHeader> Treatment </CCardHeader> -->
          <CCardHeader> X-Ray Diagnostics </CCardHeader>
          <CCardBody>
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
                    <p v-if="isSaving">
                      Uploading {{ fileCount }} files. Please wait...
                    </p>
                  </div>
                </form>
                <!--SUCCESS-->
                <div v-if="isSuccess">
                  <p>
                    {{ uploadedFiles.length }} file(s) successfully uploaded.
                  </p>
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
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <p>
              If you don't have a sample image, you can use from below link.
            </p>
            <ul>
              <li>
                <a
                  href="http://178.128.105.21:5000/sample/xray4.png"
                  target="_blank"
                  >Image 1</a
                >
              </li>
              <li>
                <a
                  href="http://178.128.105.21:5000/sample/xray5.png"
                  target="_blank"
                  >Image 2</a
                >
              </li>
              <li>
                <a
                  href="http://178.128.105.21:5000/sample/xray6.png"
                  target="_blank"
                  >Image 3</a
                >
              </li>
              <li>
                <a
                  href="http://178.128.105.21:5000/sample/xray7.png"
                  target="_blank"
                  >Image 4</a
                >
              </li>
              <li>
                <a
                  href="http://178.128.105.21:5000/sample/xray8.png"
                  target="_blank"
                  >Image 5</a
                >
              </li>
            </ul>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol md="12">
        <CCard>
          <!-- <CCardHeader> Treatment </CCardHeader> -->
          <CCardHeader> Description </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <h4>{{ description }}</h4>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol md="12">
        <CCard>
          <!-- <CCardHeader> Treatment </CCardHeader> -->
          <CCardHeader> Suggestion Treatment </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <CImg fluid :src="treatmentImage" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol md="12">
        <CCard>
          <!-- <CCardHeader> Treatment </CCardHeader> -->
          <CCardHeader> Supporting </CCardHeader>
          <CCardBody>
            <CLink :href="supportingPdf"> Link</CLink>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
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
      description: "",
      treatmentImage: "",
      supportingPdf: "",
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "image",
    };
  },
  computed: {
    isInitial() {
      // this.treatmentImage = "";
      // this.supportingPdf = "";
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      // this.treatmentImage = "";
      // this.supportingPdf = "";
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
      this.treatmentImage = "";
      this.supportingPdf = "";
      this.description = "";
    },
    save(formData) {
      // upload data to the server

      this.currentStatus = STATUS_SAVING;

      upload(formData)
        //.then(wait(15000)) // DEV ONLY: wait for 1.5s
        .then((x) => {
          console.log("success");
          console.log(x);

          this.uploadedFiles = [].concat(x.data.url);
          this.currentStatus = STATUS_SUCCESS;
          var fileNameWithoutExt = x.data.file_name
            .split(".")
            .slice(0, -1)
            .join(".");
          this.treatmentImage =
            "http://178.128.105.21:5000/treatment/" +
            fileNameWithoutExt +
            ".png";
          this.supportingPdf =
            "http://178.128.105.21:5000/supporting/" +
            fileNameWithoutExt +
            ".pdf";

          switch (fileNameWithoutExt) {
            case "xray1":
              this.description = "Distal radius fracture";
              break;
            case "xray2":
              this.description = "Distal 3rd radius ulna fracture";
              break;
            case "xray3":
              this.description = "Fracture midshaft of radius ulna";
              break;
            case "xray4":
              this.description = "Supracondylar humerus fracture";
              break;
            case "xray5":
              this.description = "Distal end radius fracture";
              break;
            case "xray6":
              this.description = "Distal end radius and ulna fracture";
              break;
            case "xray7":
              this.description = "Distal end radius fracture";
              break;
            case "xray8":
              this.description = "Fracture midshaft of radius ulna";
              break;

            default:
              this.description = "";
              break;
          }
        })
        .catch((err) => {
          console.log("failed");

          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
          this.treatmentImage = "";
          this.supportingPdf = "";
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