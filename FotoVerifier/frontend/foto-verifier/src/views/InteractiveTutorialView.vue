<template>
  <div class="container-fluid min-vh-100 d-flex flex-column main-content">
    <!-- <div class="row">
      <div class="col">Top Bar</div>
    </div> -->
    <div class="row flex-grow-1">
      <div class="col-md-3 left-part">
        <div class="row pt-2">
          <div class="col-md-1">
            <button type="button" class="btn btn-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="col-md-8">
            <h4 class="title" style="padding-left: 10px">SQL Injection</h4>
          </div>
          <div class="col-md-3">
            <div class="dropdown float-end">
              <button
                class="btn btn-warning dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                1/19
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li>
                  <a class="dropdown-item active" href="#">Another action</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-md-12">
            <div class="progress">
              <div
                class="progress-bar bg-warning"
                role="progressbar"
                style="width: 25%"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        <hr />
        <div class="row pt-2">
          <h5 class="title">2. Email</h5>
          <p>
            CarVibe's developers have recently launched the Rider Rewards
            Program (RRP), a software service that sends automated email
            notifications to CarVibe customers, offering promotional discounts
            on their next ride.
          </p>
        </div>
        <div class="fixed-bottom col-md-3 text-brown instruction">
          <div class="row">
            <div class="col-md-12">
              <center><h5>Instruction</h5></center>
            </div>
          </div>
          <div class="instruction-divider"></div>
          <div class="row">
            <div class="col-md-12 pt-2">
              When you are ready, click NEXT to continue
            </div>
          </div>
          <div class="row pt-2">
            <div class="col-md-6">
              <button type="button" class="btn btn-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-question-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                  />
                </svg>
                Re-show Instruction
              </button>
            </div>
            <div class="col-md-6">
              <button type="button" class="btn btn-warning float-end">
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9 right-part">
        <div class="browser-container">
          <div class="browser-row">
            <div class="browser-column browser-left">
              <span class="browser-dot" style="background: #ed594a"></span>
              &nbsp;
              <span class="browser-dot" style="background: #fdd800"></span>
              &nbsp;
              <span class="browser-dot" style="background: #5ac05a"></span>
            </div>
            <div class="browser-column browser-middle">
              <input
                type="text"
                class="form-control"
                value="http://www.w3schools.com"
              />
            </div>
          </div>
          <div class="browser-content">
            <iframe
              src="http://localhost:8080"
              width="1366"
              height="768"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
.left-part {
  background-color: #232e55;
  border-right: 1px solid rgba(128, 152, 255, 0.22);
  padding: 20px 20px 20px 20px;
}

.right-part {
  background-color: #26315b;
  padding: 20px 20px 20px 20px;
}

.instruction {
  background-color: #2c3967;
  padding: 10px 10px 10px 10px;
  font-size: 0.875rem;
  border-right: 1px solid rgba(128, 152, 255, 0.22);
  border-top: 1px solid rgba(128, 152, 255, 0.22);
}

.main-content {
  color: #8a9cd1;
  font-weight: 400;
  font-family: Roboto, sans-serif;
}

.title {
  color: #c0cbeb;
}

.instruction-divider {
  height: 1px;
  color: inherit;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
}

/* The browser window */
.browser-container {
  border: 3px solid #564d7a;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

/* Container for columns and the top "toolbar" */
.browser-row {
  padding: 10px;
  background: #564d7a;
}

/* Create three unequal columns that floats next to each other */
.browser-column {
  float: left;
}

.browser-left {
  width: 15%;
}

.browser-right {
  width: 10%;
}

.browser-middle {
  width: 75%;
}

/* Clear floats after the columns */
.browser-row:after {
  content: "";
  display: table;
  clear: both;
}

/* Three dots */
.browser-dot {
  margin-top: 4px;
  height: 12px;
  width: 12px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

/* Three bars (hamburger menu) */
.browser-bar {
  width: 17px;
  height: 3px;
  background-color: #aaa;
  margin: 3px 0;
  display: block;
}
</style>
