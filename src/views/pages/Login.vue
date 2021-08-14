<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="4">
          <CCardGroup>
            <CCard class="p-6">
              <CCardBody  class="rounded float-start ">
                <CForm class="mb-2 text-center" >
                  <!-- <div class="c-avatar">
                    <img src="img/logo.png" />
                  </div> -->
                  <!-- <h1>Teleradiology</h1> -->
                  <CImg src="img/logo.png"  class="mb-2" ></CImg>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="obj.email"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="obj.password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol class="text-center">
                      <CButton
                        color="primary"
                        class="px-4"
                        @click.prevent="login"
                        >Login</CButton
                      >
                    </CCol>
               
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <!-- <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard> -->
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      obj: {
        // email: "admin@test.com",
        // password: "password",
        email: "",
        password: "",
        authenticated: true,
      },
    };
  },
  mounted() {
    var self = this;
    self.authenticated = auth.check();
    if (self.authenticated) {
      self.$router.push({ path: "/dashboard" });

      // self.$router.push({ path: "/dashboard" });
    }
  },
  methods: {
    login() {
      var self = this;
      let data = {
        email: self.obj.email,
        password: self.obj.password,
      };
      var authResult = auth.doLogin(data);
      if (authResult) {
        auth.recordLogin(authResult.token, authResult.user);
        self.$router.push({ path: "/dashboard" });
      }

      // auth.doLogin(data).then((response) => {
      //   auth.recordLogin(response.result.token, response.result);
      //   self.$router.push({ path: "/dashboard" });
      //   // self.$router.push({ path: "/" });
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  background: rgb(46, 47, 61);
}

.btn-primary {
    color: #fff;
    background-color: rgb(125, 165, 193);
    border-color: rgb(71, 92, 108);
}

</style>