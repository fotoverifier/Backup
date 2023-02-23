<template>
  <div class="dark-layer" v-if="isShowHint1"></div>
  <div class="dark-layer" v-if="isShowHint2"></div>
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
        <li
          class="nav-item"
          :class="{ 'top-all': isShowHint1, 'active-animation': isShowHint1 }"
          @mouseover="hideHint1"
        >
          <a
            class="nav-link py-3 border-bottom edit-image-mode"
            :class="{ active: step >= 2 }"
            title="Check shadow consistency"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            @click="moveToStep2"
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
        <li class="nav-item">
          <a
            class="nav-link py-3 border-bottom advanced-mode"
            title="More tools"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
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
      class="flex-shrink-0 p-3 bg-white edit-image-sub-sidebar"
      style="width: 350px"
      v-if="step >= 2"
      :class="{ 'top-all': isShowHint2, 'active-animation': isShowHint2 }"
    >
      <p style="font-weight: 600; color: rgba(0, 0, 0, 0.65)">Shadow Status</p>
      <center
        v-if="!isLoading && step != 19 && step != 20 && step != 21"
        :class="{ 'top-all': isShowHint17, 'active-animation': isShowHint17 }"
        @mouseover="hideHint17"
      >
        <h3 class="text-success">Consistency</h3>
        <p>All selected shadows are consistent with one light source</p>
      </center>
      <center
        v-if="!isLoading && (step == 19 || step == 20)"
        :class="{ 'top-all': isShowHint19, 'active-animation': isShowHint19 }"
      >
        <h3 class="text-danger">Inconsistency</h3>
        <p>Some selected shadows are from another light source</p>
      </center>
      <center
        v-if="!isLoading && step == 21"
        :class="{ 'top-all': isShowHint21, 'active-animation': isShowHint21 }"
      >
        <h3 class="text-danger">Inconsistency</h3>
        <p>Some selected shadows are from another light source</p>
      </center>
      <center v-if="isLoading">
        <div class="row">
          <div class="col-sm-12">
            <center>
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </center>
          </div>
        </div>
      </center>
      <ul class="list-unstyled ps-0 pt-2">
        <li class="mb-1">
          <center>
            <button
              class="btn btn-primary align-items-center rounded"
              :class="{
                'top-all-3': isShowHint16,
                'active-animation': isShowHint16,
              }"
              @mouseover="hideHint16"
              @click="moveToStep17"
              v-if="step <= 17"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
              Check Shadow Consistency
            </button>
            <button
              class="btn btn-primary align-items-center rounded"
              :class="{
                'top-all-3': isShowHint18,
                'active-animation': isShowHint18,
              }"
              @mouseover="hideHint18"
              @click="moveToStep19"
              v-if="step >= 18 && step < 20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
              Check Shadow Consistency
            </button>
            <button
              class="btn btn-primary align-items-center rounded"
              :class="{
                'top-all-3': isShowHint20,
                'active-animation': isShowHint20,
              }"
              @mouseover="hideHint20"
              @click="moveToStep21"
              v-if="step >= 20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
              Check Shadow Consistency
            </button>
          </center>
        </li>
      </ul>
      <div class="border-bottom pt-4"></div>
      <div class="pt-2"></div>
      <p style="font-weight: 600; color: rgba(0, 0, 0, 0.65)">
        Cast Shadow Constraint
      </p>
      <div
        class="table-responsive"
        :class="{ 'top-all': isShowHint14, 'active-animation': isShowHint14 }"
      >
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
          <table
            class="table table-bordered table-striped mb-0"
            :class="{
              'top-all': isShowHint19 || isShowHint21,
              'active-animation': isShowHint19 || isShowHint21,
            }"
          >
            <thead>
              <tr>
                <th scope="col">Show</th>
                <th scope="col">ID</th>
                <th scope="col">P1</th>
                <th scope="col">P2</th>
                <th scope="col">P3</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="step >= 13">
                <th scope="row">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :checked="true"
                    disabled
                  />
                </th>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20,
                    'text-danger': step == 19 || step == 20,
                  }"
                >
                  1
                </td>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20,
                    'text-danger': step == 19 || step == 20,
                  }"
                >
                  ({{ Math.round(111.84308131241085) }},
                  {{ Math.round(127.46362339514978) }})
                </td>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20,
                    'text-danger': step == 19 || step == 20,
                  }"
                >
                  ({{ Math.round(168.7018544935806) }},
                  {{ Math.round(92.47360912981455) }})
                </td>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20,
                    'text-danger': step == 19 || step == 20,
                  }"
                >
                  ({{ Math.round(160.57917261055636) }},
                  {{ Math.round(128.08844507845936) }})
                </td>
              </tr>
              <tr v-if="step >= 15">
                <th scope="row">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :checked="true"
                    disabled
                  />
                </th>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20 || step == 21,
                    'text-danger': step == 19 || step == 20 || step == 21,
                  }"
                >
                  2
                </td>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20 || step == 21,
                    'text-danger': step == 19 || step == 20 || step == 21,
                  }"
                >
                  ({{ Math.round(290.5420827389444) }},
                  {{ Math.round(206.81597717546362) }})
                </td>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20 || step == 21,
                    'text-danger': step == 19 || step == 20 || step == 21,
                  }"
                >
                  ({{ Math.round(404.2596291012839) }},
                  {{ Math.round(166.82738944365192) }})
                </td>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20 || step == 21,
                    'text-danger': step == 19 || step == 20 || step == 21,
                  }"
                >
                  ({{ Math.round(407.38373751783166) }},
                  {{ Math.round(181.19828815977175) }})
                </td>
              </tr>
              <tr v-if="step >= 18">
                <th scope="row">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :checked="true"
                    disabled
                  />
                </th>
                <td>3</td>
                <td>
                  ({{ Math.round(158.07988587731813) }},
                  {{ Math.round(281.169757489301) }})
                </td>
                <td>
                  ({{ Math.round(269.2981455064194) }},
                  {{ Math.round(248.679029957204) }})
                </td>
                <td>
                  ({{ Math.round(271.1726105563481) }},
                  {{ Math.round(266.1740370898716) }})
                </td>
              </tr>
              <tr v-if="step >= 18">
                <th scope="row">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :checked="true"
                    disabled
                  />
                </th>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20 || step == 21,
                    'text-danger': step == 19 || step == 20 || step == 21,
                  }"
                >
                  4
                </td>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20 || step == 21,
                    'text-danger': step == 19 || step == 20 || step == 21,
                  }"
                >
                  ({{ Math.round(350.5249643366619) }},
                  {{ Math.round(278.6704707560628) }})
                </td>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20 || step == 21,
                    'text-danger': step == 19 || step == 20 || step == 21,
                  }"
                >
                  ({{ Math.round(466.74179743223965) }},
                  {{ Math.round(247.42938659058487) }})
                </td>
                <td
                  :class="{
                    'fw-bold': step == 19 || step == 20 || step == 21,
                    'text-danger': step == 19 || step == 20 || step == 21,
                  }"
                >
                  ({{ Math.round(467.9914407988588) }},
                  {{ Math.round(264.2995720399429) }})
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="pt-2"></div>
      <div class="row">
        <div class="col-sm-12">
          <center>
            <button
              class="btn btn-outline-success align-items-center rounded"
              :class="{
                'top-all': isShowHint9,
                'active-animation': isShowHint9,
              }"
              @mouseover="hideHint9"
              @click="moveToStep10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
              </svg>
              Add New
            </button>
          </center>
        </div>
      </div>
      <div class="border-bottom pt-4"></div>
      <div class="pt-2"></div>
      <p style="font-weight: 600; color: rgba(0, 0, 0, 0.65)">
        Attached Shadow Constraint
      </p>
      <div
        class="table-responsive"
        :class="{ 'top-all': isShowHint8, 'active-animation': isShowHint8 }"
      >
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
          <table class="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">Show</th>
                <th scope="col">ID</th>
                <th scope="col">P1</th>
                <th scope="col">P2</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="step >= 7">
                <th scope="row">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :checked="true"
                    disabled
                  />
                </th>
                <td>1</td>
                <td>
                  ({{ Math.round(571.0870185449359) }},
                  {{ Math.round(69.35520684736092) }})
                </td>
                <td>
                  ({{ Math.round(592.3309557774608) }},
                  {{ Math.round(47.48644793152639) }})
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="pt-2"></div>
      <div class="row">
        <div class="col-sm-12">
          <center>
            <button
              class="btn btn-outline-success align-items-center rounded"
              :class="{
                'top-all': isShowHint4,
                'active-animation': isShowHint4,
              }"
              @mouseover="hideHint4"
              @click="moveToStep5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
              </svg>
              Add New
            </button>
          </center>
        </div>
      </div>

      <div class="border-bottom pt-4"></div>
      <div class="pt-2"></div>
      <p style="font-weight: 600; color: rgba(0, 0, 0, 0.65)">
        Edit Constraint
      </p>
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          <div class="row">
            <div class="col-md-6">
              <center>
                <button class="btn btn-secondary align-items-center rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-counterclockwise"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                    />
                    <path
                      d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
                    />
                  </svg>
                  Reset Image
                </button>
              </center>
            </div>
            <div class="col-md-6">
              <center>
                <button
                  class="btn btn-outline-danger align-items-center rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eraser"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
                    />
                  </svg>
                  Eraser
                </button>
              </center>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="container-fluid scrollarea" v-if="step >= 2">
      <div class="row my-container">
        <div class="col-sm-6">
          <div class="d-flex flex-row">
            <div class="pt-2">
              <h4>
                <b>
                  <p class="content-title">Check shadow consistency</p>
                </b>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="d-flex flex-row-reverse">
            <div class="p-2">
              <a href="#" class="btn btn-primary">
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
              <a href="#" class="btn btn-success btn-new-analyze">
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
        <div
          class="col-sm-12 p-2"
          :class="{ 'top-all': isShowHint3, 'active-animation': isShowHint3 }"
        >
          <h5><b>Result</b></h5>
          <center>
            <WorkingImage
              ref="workingImage"
              @resetTool="resetTool"
              @updateCastShadowConstraints="updateCastShadowConstraints"
              @updateAttachedShadowConstraints="updateAttachedShadowConstraints"
              :imageData="uploadedImage"
              :canvasWidth="imageViewWidth1"
              :canvasHeight="imageViewHeight1"
              :tool="tool"
              @moveToStep6="moveToStep6"
              @moveToStep7="moveToStep7"
              @moveToStep11="moveToStep11"
              @moveToStep12="moveToStep12"
              @moveToStep13="moveToStep13"
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
import WorkingImage from "./WorkingImage.vue";
import ImageView from "../../../components/ImageView.vue";

export default {
  setup() {
    let workingImage = ref(null);
    let isShowHint1 = ref(false);
    let isShowHint2 = ref(false);
    let isShowHint3 = ref(false);
    let isShowHint4 = ref(false);
    let isShowHint8 = ref(false);
    let isShowHint9 = ref(false);
    let isShowHint14 = ref(false);
    let isShowHint16 = ref(false);
    let imageViewWidth = ref(window.innerWidth / 3);
    let imageViewHeight = ref(window.innerHeight / 3);
    let imageViewWidth1 = ref(window.innerWidth / 1.75);
    let imageViewHeight1 = ref(window.innerHeight / 1.75);
    let sourceCanvas = ref(null);
    let resultCanvas = ref(null);
    let uploadedImage = ref("");
    let showImage = ref(false);
    let showResultImage = ref(false);
    let step = ref(1);
    let resultImage = ref("");
    let isLoading = ref(false);
    let isShowHint17 = ref(false);
    let isShowHint18 = ref(false);
    let isShowHint19 = ref(false);
    let isShowHint20 = ref(false);
    let isShowHint21 = ref(false);

    let iframeEvent = function (event) {
      if (typeof event.data !== "undefined" && event.data !== null) {
        if (event.data == "step-10-show-hint-1") {
          isShowHint1.value = true;
        } else if (event.data == "step-10-move-to-step-3") {
          moveToStep3();
        } else if (event.data == "step-10-move-to-step-4") {
          moveToStep4();
        } else if (event.data == "step-10-show-hint-4") {
          isShowHint4.value = true;
        } else if (event.data == "step-10-move-to-step-8") {
          moveToStep8();
        } else if (event.data == "step-10-move-to-step-9") {
          moveToStep9();
        } else if (event.data == "step-10-show-hint-9") {
          isShowHint9.value = true;
        } else if (event.data == "step-10-move-to-step-14") {
          moveToStep14();
        } else if (event.data == "step-10-move-to-step-15") {
          moveToStep15();
        } else if (event.data == "step-10-move-to-step-16") {
          moveToStep16();
        } else if (event.data == "step-10-show-hint-16") {
          isShowHint16.value = true;
        } else if (event.data == "step-10-show-hint-17") {
          isShowHint17.value = true;
        } else if (event.data == "step-10-show-hint-18") {
          isShowHint18.value = true;
        } else if (event.data == "step-10-move-to-step-18") {
          moveToStep18();
        } else if (event.data == "step-10-move-to-step-20") {
          moveToStep20();
        } else if (event.data == "step-10-show-hint-20") {
          isShowHint20.value = true;
        }
      }
    };

    window.addEventListener("message", iframeEvent, false);

    let img = new Image();
    img.src = "/image/interactive-tutorial/shadow-consistency/sample.jpg";

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
      if (step.value != 1) {
        return;
      }
      isShowHint1.value = false;
      window.parent.postMessage("step-10-hide-hint-1", window.location.origin);
    };

    let hideHint4 = function () {
      isShowHint4.value = false;
      window.parent.postMessage("step-10-hide-hint-4", window.location.origin);
    };

    let hideHint9 = function () {
      isShowHint9.value = false;
      window.parent.postMessage("step-10-hide-hint-9", window.location.origin);
    };

    let hideHint16 = function () {
      isShowHint16.value = false;
      window.parent.postMessage("step-10-hide-hint-16", window.location.origin);
    };

    let hideHint17 = function () {
      isShowHint17.value = false;
      window.parent.postMessage("step-10-hide-hint-17", window.location.origin);
    };

    let hideHint18 = function () {
      isShowHint18.value = false;
      window.parent.postMessage("step-10-hide-hint-18", window.location.origin);
    };

    let hideHint20 = function () {
      isShowHint20.value = false;
      window.parent.postMessage("step-10-hide-hint-20", window.location.origin);
    };

    onMounted(() => {
      Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      ).forEach(
        (tooltipNode) => new Tooltip(tooltipNode, { trigger: "hover" })
      );
    });

    let moveToStep2 = function () {
      if (step.value != 1) {
        return;
      }
      step.value = 2;
      isShowHint1.value = false;
      isShowHint2.value = true;
      window.parent.postMessage(
        "step-10-move-to-step-2",
        window.location.origin
      );
    };

    let moveToStep3 = function () {
      if (step.value != 2) {
        return;
      }
      step.value = 3;
      isShowHint2.value = false;
      isShowHint3.value = true;
    };

    let moveToStep4 = function () {
      if (step.value != 3) {
        return;
      }
      step.value = 4;
      isShowHint3.value = false;
      isShowHint4.value = true;
    };

    let moveToStep5 = function () {
      if (step.value != 4) {
        return;
      }
      step.value = 5;
      workingImage.value.moveToStep5();
      window.parent.postMessage(
        "step-10-move-to-step-5",
        window.location.origin
      );
    };

    let moveToStep6 = function () {
      if (step.value != 5) {
        return;
      }
      step.value = 6;
      window.parent.postMessage(
        "step-10-move-to-step-6",
        window.location.origin
      );
    };

    let moveToStep7 = function () {
      if (step.value != 6) {
        return;
      }
      step.value = 7;
      window.parent.postMessage(
        "step-10-move-to-step-7",
        window.location.origin
      );
    };

    let moveToStep8 = function () {
      if (step.value != 7) {
        return;
      }
      step.value = 8;
      isShowHint8.value = true;
    };

    let moveToStep9 = function () {
      if (step.value != 8) {
        return;
      }
      isShowHint8.value = false;
      step.value = 9;
      isShowHint9.value = true;
    };

    let moveToStep10 = function () {
      if (step.value != 9) {
        return;
      }
      step.value = 10;
      workingImage.value.moveToStep10();
      window.parent.postMessage(
        "step-10-move-to-step-10",
        window.location.origin
      );
    };

    let moveToStep11 = function () {
      if (step.value != 10) {
        return;
      }
      step.value = 11;
      window.parent.postMessage(
        "step-10-move-to-step-11",
        window.location.origin
      );
    };

    let moveToStep12 = function () {
      if (step.value != 11) {
        return;
      }
      step.value = 12;
      window.parent.postMessage(
        "step-10-move-to-step-12",
        window.location.origin
      );
    };

    let moveToStep13 = function () {
      if (step.value != 12) {
        return;
      }
      step.value = 13;
      window.parent.postMessage(
        "step-10-move-to-step-13",
        window.location.origin
      );
    };

    let moveToStep14 = function () {
      if (step.value != 13) {
        return;
      }
      step.value = 14;
      isShowHint14.value = true;
    };

    let moveToStep15 = function () {
      if (step.value != 14) {
        return;
      }
      isShowHint14.value = false;
      step.value = 15;
      workingImage.value.moveToStep15();
    };

    let moveToStep16 = function () {
      if (step.value != 15) {
        return;
      }
      step.value = 16;
      isShowHint16.value = true;
    };

    let moveToStep17 = function () {
      if (step.value != 16) {
        return;
      }
      isShowHint16.value = false;
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
        step.value = 17;
        isShowHint17.value = true;
        window.parent.postMessage(
          "step-10-move-to-step-17",
          window.location.origin
        );
      }, 800);
    };

    let moveToStep18 = function () {
      if (step.value != 17) {
        return;
      }
      isShowHint17.value = false;
      step.value = 18;
      isShowHint18.value = true;
      workingImage.value.moveToStep18();
    };

    let moveToStep19 = function () {
      if (step.value != 18) {
        return;
      }
      isShowHint18.value = false;
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
        step.value = 19;
        isShowHint19.value = true;
        window.parent.postMessage(
          "step-10-move-to-step-19",
          window.location.origin
        );
      }, 800);
    };

    let moveToStep20 = function () {
      if (step.value != 19) {
        return;
      }
      isShowHint19.value = false;
      step.value = 20;
      isShowHint20.value = true;
    };

    let moveToStep21 = function () {
      if (step.value != 20) {
        return;
      }
      isShowHint20.value = false;
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
        step.value = 21;
        isShowHint21.value = true;
        window.parent.postMessage(
          "step-10-move-to-step-21",
          window.location.origin
        );
      }, 800);
    };

    return {
      workingImage,
      imageViewWidth,
      imageViewHeight,
      imageViewWidth1,
      imageViewHeight1,
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
      moveToStep3,
      resultImage,
      isShowHint3,
      isShowHint4,
      hideHint4,
      moveToStep5,
      moveToStep6,
      moveToStep7,
      isShowHint8,
      isShowHint9,
      hideHint9,
      moveToStep10,
      moveToStep11,
      moveToStep12,
      moveToStep13,
      moveToStep14,
      isShowHint14,
      isShowHint16,
      hideHint16,
      isLoading,
      moveToStep17,
      isShowHint17,
      hideHint17,
      hideHint18,
      isShowHint18,
      isShowHint19,
      moveToStep19,
      isShowHint20,
      hideHint20,
      moveToStep21,
      isShowHint21,
    };
  },
  components: {
    WorkingImage,
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

.top-all-3 {
  z-index: 999999999;
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
