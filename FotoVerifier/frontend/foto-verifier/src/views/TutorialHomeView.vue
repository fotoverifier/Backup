<template>
  <div class="container-fluid min-vh-100 d-flex flex-column main-content">
    <!-- <div class="row">
      <div class="col">Top Bar</div>
    </div> -->
    <div class="row flex-grow-1">
      <div class="col-md-12">
        <center>
          <p>
            <span class="title-blue">FotoVerifier</span>
            <span class="title-orange"> Tutorial</span>
          </p>
        </center>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <center>
                <p class="text-brown">
                  In this page, we will show you how to use the FotoVerifier
                  tool to do digital image forensics. The goal of the tutorials
                  is to help you understand how each tool works, how to read the
                  results, and the strengths and weaknesses of each tool in
                  order to use them properly. To make sure you understand and
                  don't get bored reading too much text, we've designed
                  exercises in each tutorial, which you can interact with by
                  doing these exercises. Now start by choosing one of the
                  instructions below.
                </p>
              </center>
            </div>
          </div>
        </div>
        <div class="container" style="padding-top: 40px">
          <div class="row">
            <!--<div class="col-md-4">
              <center>
                <div class="card" style="width: 17rem">
                  <img
                    src="/image/interactive-tutorial/home/metadata.png"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <p class="card-text"></p>
                    <a href="#" class="btn btn-primary stretched-link"
                      >Image Metadata</a
                    >
                  </div>
                </div>
              </center>
            </div>-->
            <div class="col-md-4">
              <center>
                <div class="card" style="width: 17rem">
                  <img
                    src="/image/interactive-tutorial/home/copy-move.png"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <p class="card-text"></p>
                    <a
                      href="/copy-move-tutorial"
                      class="btn btn-primary stretched-link"
                      >Detect Image Cloning</a
                    >
                  </div>
                </div>
              </center>
            </div>
            <div class="col-md-4">
              <center>
                <div class="card" style="width: 17rem">
                  <img
                    src="/image/interactive-tutorial/home/splicing.png"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <p class="card-text"></p>
                    <a
                      href="/jpeg-ghost-tutorial"
                      class="btn btn-primary stretched-link"
                      >Detect JPEG Image Splicing</a
                    >
                  </div>
                </div>
              </center>
            </div>
            <div class="col-md-4">
              <center>
                <div class="card" style="width: 17rem">
                  <img
                    src="/image/interactive-tutorial/home/splicing.png"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <p class="card-text"></p>
                    <a
                      href="/cfa-tutorial"
                      class="btn btn-primary stretched-link"
                      >Detect Image Splicing</a
                    >
                  </div>
                </div>
              </center>
            </div>
          </div>
          <div class="row pt-4">
            <div class="col-md-4">
              <center>
                <div class="card" style="width: 17rem">
                  <img
                    src="/image/interactive-tutorial/home/shadow-consistency.png"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <p class="card-text"></p>
                    <a
                      href="/shadow-consistency-tutorial"
                      class="btn btn-primary stretched-link"
                      >Check Shadow Consistency</a
                    >
                  </div>
                </div>
              </center>
            </div>
            <div class="col-md-4">
              <center>
                <div class="card" style="width: 17rem">
                  <img
                    src="/image/interactive-tutorial/home/reflection-consistency.png"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <p class="card-text"></p>
                    <a
                      href="/reflection-consistency-tutorial"
                      class="btn btn-primary stretched-link"
                      >Check Reflection Consistency</a
                    >
                  </div>
                </div>
              </center>
            </div>
          </div>
          <div class="pt-4"></div>
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
.main-content {
  background-image: linear-gradient(131deg, #231e4e, #0a0430);
}

.title-blue {
  margin-top: 0;
  color: #2a59fe;
  font-size: 60px;
  font-weight: 700;
}

.title-orange {
  margin-top: 0;
  color: #f18157;
  font-size: 60px;
  font-weight: 700;
}

.text-brown {
  color: hsla(0, 0%, 100%, 0.7803921568627451);
}

.card:hover {
  border: 4px solid #f18157;
}
</style>
