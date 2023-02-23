<template>
  <div class="image-content">
    <div class="upload-content">
      <div class="landing-page-content">
        <p class="title">FotoVerifier</p>
        <p class="description">
          FotoVerifier is a tool for detecting image tampering using Digital
          Image Forensics techniques, along with the techniques are some other
          functionalities which further enhance the user's engagement. With the
          goals of creating an actual environment for interacting with different
          DIF methods, FotoVerifier was created.
        </p>

        <form class="form-input" @submit.prevent="handleUploadImage">
          <p class="tooltip-main">Select an image to analyze</p>
          <div class="input-group-main">
            <input type="file" id="image-input" name="fileInput" />
            <button type="submit" class="btn btn-primary btn-analyze">
              Analyze
            </button>
          </div>
        </form>
        <form class="form-input" @submit.prevent="handleUploadImageByURL">
          <p class="tooltip-main">Or analyze image from an URL</p>
          <div class="input-group-main">
            <input
              id="image-input-url"
              name="imageURL"
              placeholder="Type the image url..."
            />
            <button type="submit" class="btn btn-primary btn-analyze-url">
              Analyze
            </button>
          </div>
        </form>

        <a href="/tutorial-home" target="_blank" class="tutorial-btn top-all">
          <div>
            <p style="margin-top: 1rem">
              Go to
              <span style="font-weight: bold">Tutorial </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.8037 3.3198L3.42386 7.62196L6.93473 8.19963C7.51236 8.29467 7.98193 8.71706 8.13736 9.28144L9.05998 12.6315L12.8037 3.3198ZM13.1103 0.978857C14.3428 0.41358 15.6332 1.6438 15.1274 2.90183L10.363 14.752C9.82741 16.0842 7.90637 15.975 7.52512 14.5907L5.79511 10.3048L1.48454 9.32977C0.0240198 9.08946 -0.242675 7.10332 1.10272 6.48624L13.1103 0.978857Z"
                  fill="white"
                ></path>
              </svg>
            </p>
          </div>
        </a>
      </div>

      <div class="upload-loading pt-2" v-if="isUploading">
        <center>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import { isImage, getImageDataFromURL } from "../utils/image.js";
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    let isUploading = ref(false);

    let handleUploadImage = function (e) {
      if (e.target.elements.fileInput.files.length == 0) {
        Swal.fire({
          icon: "error",
          title: "No image selected",
          text: "Please select an image to analyze!",
        });
      } else {
        let file = e.target.elements.fileInput.files[0];
        let reader = new FileReader();
        reader.onload = async function (e) {
          let isValidImage = await isImage(e.target.result);
          isUploading.value = false;
          if (!isValidImage) {
            Swal.fire({
              icon: "error",
              title: "Invalid image",
              text: "Not a valid image. Please select another file!",
            });
          } else {
            router.push({
              name: "image-information",
              params: { uploadedImage: e.target.result },
            });
          }
        };
        isUploading.value = true;
        reader.readAsDataURL(file);
      }
    };

    let handleUploadImageByURL = async function (e) {
      isUploading.value = true;
      let imageURL = e.target.elements.imageURL.value;
      if (!imageURL) {
        isUploading.value = false;
        Swal.fire({
          icon: "error",
          title: "No image URL provided",
          text: "Please type an URL to your image",
        });
      } else {
        let fetchData = await getImageDataFromURL(imageURL);
        if (fetchData.error) {
          isUploading.value = false;
          Swal.fire({
            icon: "error",
            title: "Error fetching image",
            text: "We can't fetch image from your url, please check it again",
          });
        } else {
          let isValidImage = await isImage(fetchData.data);
          isUploading.value = false;
          if (!isValidImage) {
            Swal.fire({
              icon: "error",
              title: "Invalid image",
              text: "Not a valid image. Please select another file!",
            });
          } else {
            router.push({
              name: "image-information",
              params: { uploadedImage: fetchData.data },
            });
          }
        }
      }
    };

    return { isUploading, handleUploadImage, handleUploadImageByURL };
  },
};
</script>

<style scoped>
.image-content {
  background-color: white;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 7px;
}

.upload-content {
  background-color: white;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 7px;
}

.landing-page-content {
  padding: 5% 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(42, 89, 254, 0.1);
}

.title {
  margin-top: 0;
  color: #2a59fe;
  font-size: 90px;
  font-weight: 900;
}

.description {
  background-color: #fff;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  padding: 12px 14px;
  border-radius: 5px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
}

.form-input {
  width: 50vw;
  margin-bottom: 5%;
}

.tooltip-main {
  color: rgba(42, 89, 254, 0.8);
  text-align: center;
  margin-top: 1rem;
}

.input-group-main {
  border: 2px dashed rgba(42, 89, 254, 0.8);
  border-radius: 5px;
  padding: 5%;
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 5%;
}

#image-input-url,
#image-input {
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: black;
  border: none;
  border-radius: 5px;
}

#image-input-url {
  padding: 8px 12px;
}

#image-input {
  font-size: 18px;
  color: rgba(42, 89, 254, 0.5);
}

input::placeholder {
}

input[value] {
  color: green;
}

input[type="file"]::-webkit-file-upload-button {
  height: 100%;
  border: none;
  background-color: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.85),
      rgba(255, 255, 255, 0.85)
    ),
    linear-gradient(0deg, rgba(42, 89, 254, 0.3), rgba(42, 89, 254, 0.3)),
    linear-gradient(0deg, #000000, #000000);
  color: rgba(42, 89, 254, 0.3);
  font-size: 18px;
  font-weight: bold;
  padding: 8px 25px;
  margin-right: 10px;
  border-radius: 5px;
}

.btn-analyze,
.btn-analyze-url {
  background-color: #2a59fe;
  color: white;
  padding: 8px 42px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  border: none;
}

.tutorial-btn {
  background-color: rgba(42, 89, 254, 0.8);
  color: white;
  padding-left: 10%;
  padding-right: 10%;
  border-radius: 5px;
  text-decoration: none;
}
.tutorial-btn:hover {
  cursor: pointer;
  text-decoration: underline;
}

.dark-layer {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  position: fixed;
}

.top-all {
  z-index: 999999999;
}

.active-animatioon {
  background-image: linear-gradient(90deg, silver 50%, transparent 50%),
    linear-gradient(90deg, silver 50%, transparent 50%),
    linear-gradient(0deg, silver 50%, transparent 50%),
    linear-gradient(0deg, silver 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  background-position: left top, right bottom, left bottom, right top;
  animation: border-dance 1s infinite linear;
}
@keyframes border-dance {
  0% {
    background-position: left top, right bottom, left bottom, right top;
  }
  100% {
    background-position: left 15px top, right 15px bottom, left bottom 15px,
      right top 15px;
  }
}
</style>
