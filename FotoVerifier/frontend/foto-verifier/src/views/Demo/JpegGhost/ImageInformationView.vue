<template>
  <div class="dark-layer" v-if="isShowHint1"></div>
  <div class="dark-layer" v-if="isShowHint3"></div>
  <div class="forensics-container">
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
      <symbol id="bootstrap" viewBox="0 0 118 94">
        <title>FotoVerifier</title>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
        ></path>
      </symbol>
      <symbol id="magic" viewBox="0 0 16 16">
        <path
          d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707ZM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707L7.293 4Zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1h1.829Zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1h1.829ZM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707L13.293 10ZM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0v1.829Zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0L8.354 9.06Z"
        />
      </symbol>
      <symbol id="credit-card-2-front" viewBox="0 0 16 16">
        <path
          d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
        />
        <path
          d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
        />
      </symbol>
      <symbol id="lightning-charge" viewBox="0 0 16 16">
        <path
          d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"
        />
      </symbol>
    </svg>
    <!-- Begin sidebar -->
    <div
      class="d-flex flex-column flex-shrink-0 bg-light"
      style="width: 4.5rem"
    >
      <a
        href="/"
        class="d-block p-3 link-dark text-decoration-none"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
      >
        <svg class="bi" width="40" height="32">
          <use xlink:href="#bootstrap" />
        </svg>
      </a>
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item">
          <a
            class="nav-link py-3 border-bottom image-information-mode"
            :class="{ active: step == 1 }"
            title="Image Information"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <svg
              class="bi"
              width="24"
              height="24"
              role="img"
              aria-label="Image Information"
            >
              <use xlink:href="#credit-card-2-front" />
            </svg>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link py-3 border-bottom edit-image-mode"
            title="Check shadow consistency"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-sun"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
              />
            </svg>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link py-3 border-bottom edit-image-mode"
            title="Check reflection consistency"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-square-half"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15V1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8zm6 1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12z"
              />
            </svg>
          </a>
        </li>
        <li
          class="nav-item"
          :class="{ 'top-all': isShowHint1, 'active-animation': isShowHint1 }"
          @mouseover="hideHint1"
        >
          <a
            class="nav-link py-3 border-bottom advanced-mode"
            :class="{ active: step == 2 }"
            title="More tools"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            @click="moveToStep2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
    <div class="b-example-divider"></div>
    <!-- End sidebar -->
    <div class="container-fluid scrollarea" v-if="step == 1">
      <div class="row my-container">
        <div class="col-sm-6">
          <div class="d-flex flex-row">
            <div class="pt-2">
              <h4>
                <b>
                  <p class="content-title">Image Information</p>
                </b>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="d-flex flex-row-reverse">
            <div class="p-2">
              <a class="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-question-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"
                  />
                </svg>
                Tutorial
              </a>
              &nbsp;
              <a class="btn btn-success btn-new-analyze">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-earmark-image"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  <path
                    d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"
                  />
                </svg>
                Analyze new image
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-container image-information-navbar">
        <div class="col-sm-12 p-2">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a
                class="a nav-link exif-metadata active"
                active-class="active"
                :to="'/image-information/exif-metadata'"
              >
                EXIF Metadata
              </a>
            </li>
            <li class="nav-item">
              <a
                class="a nav-link geo-tags"
                active-class="active"
                :to="'/image-information/geo-tags'"
              >
                Geo Tags
              </a>
            </li>
            <li class="nav-item">
              <a
                class="a nav-link thumbnail-analysis"
                active-class="active"
                :to="'/image-information/thumbnail-analysis'"
              >
                Thumbnail Analysis
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row my-container image-information-content">
        <div class="col-sm-6 p-2">
          <h5>
            <b>Result</b>
          </h5>
          <div class="container">
            <!--v-if-->
            <div class="alert alert-secondary" role="alert">
              This image has no EXIF Metadata
            </div>
          </div>
        </div>
        <div class="col-sm-6 p-2">
          <h5>
            <b>Your image</b>
          </h5>
          <center>
            <ImageView
              :imageData="uploadedImage"
              :canvasWidth="imageViewWidth"
              :canvasHeight="imageViewHeight"
              v-if="showImage"
            />
          </center>
        </div>
      </div>
    </div>
    <canvas ref="sourceCanvas" style="display: none"></canvas>
    <canvas ref="resultCanvas" style="display: none"></canvas>

    <!-- step 2 -->
    <div
      class="flex-shrink-0 p-3 bg-white sub-sidebar"
      style="width: 280px"
      v-if="step == 2 || step == 3"
    >
      <a
        class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
      >
        <span class="fs-5 fw-semibold">Choose a DIF Method</span>
      </a>
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          <button
            ref="copyMoveDetection"
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#copy-move-detection-collapse"
            aria-expanded="false"
          >
            Copy-move Detection
          </button>
          <div class="collapse pt-2" id="copy-move-detection-collapse"></div>
        </li>
        <li
          class="mb-1"
          :class="{ 'top-all-2': isShowHint2, 'active-animation': isShowHint2 }"
          @mouseover="hideHint2"
          @click="moveToStep3"
        >
          <button
            ref="jpegGhost"
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#jpeg-ghost-collapse"
            aria-expanded="false"
          >
            JPEG Ghost
          </button>
          <div class="collapse pt-2" id="jpeg-ghost-collapse"></div>
        </li>
        <li class="mb-1">
          <button
            ref="colorFilterArrayDetection"
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#color-filter-array-detection-collapse"
            aria-expanded="false"
          >
            Color Filter Array Detection
          </button>
          <div
            class="collapse pt-2"
            id="color-filter-array-detection-collapse"
          ></div>
        </li>
      </ul>
    </div>
    <div class="container-fluid scrollarea" v-if="step == 2">
      <div class="row my-container">
        <div class="col-sm-6">
          <div class="d-flex flex-row">
            <div class="pt-2">
              <h4>
                <b>
                  <p class="content-title">More Tools</p>
                </b>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="d-flex flex-row-reverse">
            <div class="p-2">
              <a class="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-question-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"
                  ></path>
                </svg>
                Tutorial
              </a>
              &nbsp;
              <a class="btn btn-success btn-new-analyze">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-earmark-image"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                  ></path>
                  <path
                    d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"
                  ></path>
                </svg>
                Analyze new image
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-container">
        <div class="col-sm-12 p-2">
          <div class="alert alert-primary" role="alert">
            Select a function in the left sidebar to analyze your image
          </div>
        </div>
      </div>
    </div>

    <!-- step 3 -->
    <div class="container-fluid scrollarea" v-if="step == 3">
      <div class="row my-container">
        <div class="col-sm-6">
          <div class="d-flex flex-row">
            <div class="pt-2">
              <h4>
                <b>
                  <p class="content-title">JPEG Ghost</p>
                </b>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="d-flex flex-row-reverse">
            <div class="p-2">
              <a class="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-question-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"
                  ></path>
                </svg>
                Tutorial
              </a>
              &nbsp;
              <a class="btn btn-success btn-new-analyze">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-earmark-image"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                  ></path>
                  <path
                    d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"
                  ></path>
                </svg>
                Analyze new image
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-container" v-if="currentFunctionName != 'default'">
        <div class="col-sm-6 p-2">
          <h5>
            <b>Your image</b>
          </h5>
          <center>
            <div id="source-view">
              <ImageView
                :imageData="uploadedImage"
                :canvasWidth="imageViewWidth"
                :canvasHeight="imageViewHeight"
                v-if="showImage"
              />
            </div>
          </center>
        </div>
        <div
          class="col-sm-6 p-2"
          :class="{ 'top-all': isShowHint3, 'active-animation': isShowHint3 }"
          @mouseover="hideHint3"
        >
          <h5><b>Analysis Result</b></h5>
          <center>
            <ImageView
              :imageData="resultImage"
              :canvasWidth="imageViewWidth"
              :canvasHeight="imageViewHeight"
              v-if="showResultImage"
            />
          </center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tooltip } from "bootstrap/dist/js/bootstrap.js";
import { ref, onMounted } from "vue";
import ImageView from "../../../components/ImageView.vue";

export default {
  setup() {
    let isShowHint1 = ref(false);
    let isShowHint2 = ref(false);
    let isShowHint3 = ref(false);
    let imageViewWidth = ref(window.innerWidth / 3);
    let imageViewHeight = ref(window.innerHeight / 3);
    let sourceCanvas = ref(null);
    let resultCanvas = ref(null);
    let uploadedImage = ref("");
    let showImage = ref(false);
    let showResultImage = ref(false);
    let step = ref(1);
    let resultImage = ref("");

    let iframeEvent = function (event) {
      if (typeof event.data !== "undefined" && event.data !== null) {
        if (event.data == "step-8-show-hint-1") {
          isShowHint1.value = true;
        } else if (event.data == "step-8-show-hint-2") {
          isShowHint2.value = true;
        } else if (event.data == "step-8-show-hint-3") {
          isShowHint3.value = true;
        }
      }
    };

    window.addEventListener("message", iframeEvent, false);

    let img = new Image();
    img.src = "/image/interactive-tutorial/jpeg-ghost/sample.jpg";

    img.onload = function () {
      sourceCanvas.value.width = img.width;
      sourceCanvas.value.height = img.height;
      let sourceCtx = sourceCanvas.value.getContext("2d");
      sourceCtx.drawImage(img, 0, 0);
      uploadedImage.value = sourceCanvas.value.toDataURL("image/jpeg");
      showImage.value = true;
      isShowHint1.value = true;
    };

    let hideHint1 = function () {
      isShowHint1.value = false;
      window.parent.postMessage("step-8-hide-hint-1", window.location.origin);
    };

    let hideHint2 = function () {
      isShowHint2.value = false;
      window.parent.postMessage("step-8-hide-hint-2", window.location.origin);
    };

    let hideHint3 = function () {
      isShowHint3.value = false;
      window.parent.postMessage("step-8-hide-hint-3", window.location.origin);
    };

    onMounted(() => {
      Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      ).forEach(
        (tooltipNode) => new Tooltip(tooltipNode, { trigger: "hover" })
      );
    });

    let moveToStep2 = function () {
      step.value = 2;
      isShowHint2.value = true;
      window.parent.postMessage(
        "step-8-move-to-step-2",
        window.location.origin
      );
    };

    let moveToStep3 = function () {
      step.value = 3;
      let img = new Image();
      img.src = "/image/interactive-tutorial/jpeg-ghost/result.png";

      img.onload = function () {
        resultCanvas.value.width = img.width;
        resultCanvas.value.height = img.height;
        let resultCtx = resultCanvas.value.getContext("2d");
        resultCtx.drawImage(img, 0, 0);
        resultImage.value = resultCanvas.value.toDataURL("image/jpeg");
        showResultImage.value = true;
        isShowHint3.value = true;
      };

      window.parent.postMessage(
        "step-8-move-to-step-3",
        window.location.origin
      );
    };

    return {
      imageViewWidth,
      imageViewHeight,
      sourceCanvas,
      resultCanvas,
      uploadedImage,
      showImage,
      showResultImage,
      isShowHint1,
      hideHint1,
      step,
      moveToStep2,
      isShowHint2,
      hideHint2,
      moveToStep3,
      resultImage,
      isShowHint3,
      hideHint3,
    };
  },
  components: {
    ImageView,
  },
};
</script>

<style scoped>
.dark-layer {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  position: fixed;
}

.top-all {
  z-index: 999999999;
  background-color: white;
}

.top-all-2 {
  z-index: 999999999;
  background-color: white;
}

.active-animation {
  background-image: linear-gradient(90deg, #cc217f 50%, transparent 50%),
    linear-gradient(90deg, #cc217f 50%, transparent 50%),
    linear-gradient(0deg, #cc217f 50%, transparent 50%),
    linear-gradient(0deg, #cc217f 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 30px 2px, 30px 2px, 2px 30px, 2px 30px;
  background-position: left top, right bottom, left bottom, right top;
  animation: border-dance 0.5s infinite linear;
}
@keyframes border-dance {
  0% {
    background-position: left top, right bottom, left bottom, right top;
  }
  100% {
    background-position: left 30px top, right 30px bottom, left bottom 30px,
      right top 30px;
  }
}
</style>
