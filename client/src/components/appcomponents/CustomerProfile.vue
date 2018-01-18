<template>
  <v-card color="grey lighten-5" flat scroll-off-screen scroll-target="#scrolling-techniques" card>    
    <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2 lg8 offset-lg2>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="white" prominent >
            <v-toolbar-title class="body-2 grey--text">
              <v-avatar slot="activator">
              <v-icon>person</v-icon>
              </v-avatar>A Minha Conta                            
            </v-toolbar-title>
            <v-spacer></v-spacer>
              <v-chip v-if="this.dateCreated" class="hidden-sm-and-down">created {{this.toDateTimeString(this.dateCreated)}} </v-chip>
              <v-chip v-if="this.dateUpdated" class="hidden-sm-and-down">updated {{this.toDateTimeString(this.dateUpdated)}} </v-chip> 
            <v-btn dark @click="updateCustomer" :color="actionMode===ACTION_UPDATE_MODE ? 'success' : ''">
              <span v-if="actionMode===ACTION_EDIT_MODE">{{LABEL_EDIT}}</span>
              <span v-if="actionMode===ACTION_UPDATE_MODE">{{LABEL_UPDATE}}</span>
            </v-btn>
            <v-btn dark @click="rollbackCustomer" v-if="actionMode===ACTION_UPDATE_MODE">
              <span >{{LABEL_CANCEL}}</span>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-alert error value="true" v-if="this.error">
            {{this.error}}
          </v-alert>
          <v-card-text >            
            <div class="scroll-y" id="scrolling-techniques" >
            <v-container fluid grid-list-xl>                  
                  <v-layout row wrap>
                    <v-flex md4 lg4>
                      <v-text-field 
                      v-model="customerdata.firstName" 
                      name="firstName" 
                      label="Nome" 
                      :disabled="actionMode===ACTION_EDIT_MODE" 
                      :rules="[() => customerdata.firstName.length > 0 || 'This field is required']"
                      required></v-text-field>
                    </v-flex>
                    <v-flex md4 lg4>
                      <v-text-field
                      v-model="customerdata.lastName" 
                      name="lastName" 
                      label="Apelido" 
                      :disabled="actionMode===ACTION_EDIT_MODE"
                      :rules="[() => customerdata.lastName.length > 0 || 'This field is required']"
                      required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex md4 lg4>
                      <v-select v-bind:items="genderItems" v-model="customerdata.gender" item-value="text" label="Genero" :disabled="actionMode===ACTION_EDIT_MODE"></v-select>
                    </v-flex>
                    <v-flex md4 lg4>
                      <v-dialog v-model="modalBirthDate" lazy full-width width="290px" :disabled="actionMode===ACTION_EDIT_MODE" >
                        <v-text-field slot="activator" label="Birth Date" v-model="customerdata.birthDate" prepend-icon="event" readonly :disabled="actionMode===ACTION_EDIT_MODE" :rules="[() => customerdata.birthDate.length > 0 || 'This field is required']"
                      required></v-text-field>
                        <v-date-picker v-model="customerdata.birthDate" scrollable actions>
                          <template slot-scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                              <v-btn flat color="primary" @click="save">OK</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex md4 lg4>
                      <v-text-field v-model="customerdata.nid" name="nid" label="Número Identidade" :disabled="actionMode===ACTION_EDIT_MODE"></v-text-field>
                    </v-flex>
                    <v-flex md4 lg4>
                      <v-text-field v-model="customerdata.nif" name="nif" label="Número Fiscal" :disabled="actionMode===ACTION_EDIT_MODE"></v-text-field>
                    </v-flex>

                  </v-layout>
                  <v-layout row wrap>
                    <v-flex md5 lg5>
                      <v-text-field v-model="customerdata.nib" name="nib" label="Número Bancário" :disabled="actionMode===ACTION_EDIT_MODE"></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>

                    <v-flex md5 lg5>
                      <v-text-field v-model="customerdata.street" name="street" label="Morada" :disabled="actionMode===ACTION_EDIT_MODE"></v-text-field>
                    </v-flex>
                    <v-flex md3 lg3>
                      <v-text-field v-model="customerdata.zipcode" name="zipcode" label="Código Postal" :disabled="actionMode===ACTION_EDIT_MODE"></v-text-field>
                    </v-flex>

                  </v-layout>
                  <v-layout row wrap>
                    <v-flex md3 lg3>
                      <v-text-field v-model="customerdata.city" name="city" label="Cidade" :disabled="actionMode===ACTION_EDIT_MODE"></v-text-field>
                    </v-flex>
                    <v-flex md5 lg5>
                      <!--v-text-field v-model="customerdata.country" name="country" label="País" :disabled="actionMode===ACTION_EDIT_MODE"></v-text-field-->
                      <vue-country-select  :preselected="_preselected" 
                                           name="country" 
                                           :select="customerdata.country"
                                           :disabled="actionMode===ACTION_EDIT_MODE"
                                           >
                      </vue-country-select>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex md4 lg4>
                      <v-text-field v-model="customerdata.email" name="email" label="Email" :disabled="actionMode===ACTION_EDIT_MODE" :rules="[() => customerdata.email.length > 0 || 'This field is required']"
                      required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex md3 lg3>
                      <v-text-field v-model="customerdata.phoneNumber" name="phoneNumber" label="Telefone" :disabled="actionMode===ACTION_EDIT_MODE"></v-text-field>
                    </v-flex>
                    <v-flex md3 lg3>
                      <v-text-field v-model="customerdata.mobileNumber" name="mobileNumber" label="Telemovel" :disabled="actionMode===ACTION_EDIT_MODE" :rules="[() => customerdata.mobileNumber.length > 0 || 'This field is required']"
                      required></v-text-field>
                    </v-flex>
                  </v-layout>

                </v-container>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn dark @click="updateCustomer" :color="actionMode===ACTION_UPDATE_MODE ? 'success' : ''">
                  <span v-if="actionMode===ACTION_EDIT_MODE">{{LABEL_EDIT}}</span>
                  <span v-if="actionMode===ACTION_UPDATE_MODE">{{LABEL_UPDATE}}</span>
                </v-btn>
                <v-btn dark @click="rollbackCustomer" v-if="actionMode===ACTION_UPDATE_MODE">
                  <span >{{LABEL_CANCEL}}</span>
                </v-btn>
              </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
    <v-snackbar
          top
          :timeout="snackbarTimeout"
          :success="snackbarContext === 'success'"
          :info="snackbarContext === 'info'"
          :warning="snackbarContext === 'warning'"
          :error="snackbarContext === 'error'"
          :primary="snackbarContext === 'primary'"
          :secondary="snackbarContext === 'secondary'"
          :color="snackbarContext"
          v-model="snackbar"
          >
          {{snackbarText}}      
          </v-snackbar>
  </v-card>  
</template>

<script>
import CustomerService from '@/services/CustomerService'
import vueCountrySelect from '@/components/vue-country-select/vue-country-select'
import { mapState } from 'vuex'
const name = 'auth'
export default {
  components: {
    vueCountrySelect
  },
  data () {
    return {
      modalBirthDate: false,
      genderItems: [{ text: 'Male' }, { text: 'Female' }],
      actionMode: 0,
      error: '',
      snackbar: false,
      snackbarContext: 'success',
      snackbarTimeout: 0,
      snackbarText: '',
      customerdata: {
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        nid: '',
        nif: '',
        nib: '',
        street: '',
        zipcode: '',
        city: '',
        country: '',
        email: '',
        phoneNumber: '',
        mobileNumber: ''
      },
      dateCreated: '',
      dateUpdated: ''
    }
  },
  computed: {
    ...mapState(name, {
      isAuthenticated: 'isAuthenticated',
      profile: 'profile'
    }),
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        binding.column = true
      }
      return binding
    },
    ACTION_EDIT_MODE: () => 100,
    ACTION_UPDATE_MODE: () => 200,
    LABEL_EDIT: () => 'EDIT',
    LABEL_UPDATE: () => 'UPDATE',
    LABEL_CANCEL: () => 'CANCEL'
  },
  async created () {
    this.actionMode = this.ACTION_EDIT_MODE
    try {
      await this.fetchCustomerProfile()
    } catch (error) {
      this.error = error
    }
  },
  watch: {
    error (val) {
      this.snackbarText = val
      this.snackbarContext = 'error'
      this.snackbarTimeout = 3600
      this.snackbar = true
    }
  },
  methods: {
    toDateTimeString (isodate) {
      var trimDate = null
      try {
        trimDate = new Date(isodate).toISOString().slice(0, 22)
      } catch (error) {
        trimDate = ''
      }
      return trimDate
    },
    _preselected (value) {
      this.customerdata.country = value
    },
    cancel () {
      this.error = ''
      console.log('cancel')
    },
    save () {
      this.error = ''
      console.log('save')
    },
    async rollbackCustomer () {
      await this.fetchCustomerProfile()
      this.actionMode = this.ACTION_EDIT_MODE
      setTimeout(() => {
        this.snackbarContext = 'info'
        this.snackbarTimeout = 1000
        this.snackbarText = 'O meu perfil não foi modificado.'
        this.snackbar = true
      }, 100)
      return true
    },
    async updateCustomer (event) {
      this.error = ''
      if (this.actionMode === this.ACTION_UPDATE_MODE) {
        const datacustomer = {}
        datacustomer.firstName = this.customerdata.firstName
        datacustomer.lastName = this.customerdata.lastName
        datacustomer.gender = this.customerdata.gender
        datacustomer.birthDate = this.customerdata.birthDate
        datacustomer.nid = this.customerdata.nid
        datacustomer.nif = this.customerdata.nif
        datacustomer.nib = this.customerdata.nib
        datacustomer.street = this.customerdata.street
        datacustomer.zipcode = this.customerdata.zipcode
        datacustomer.city = this.customerdata.city
        datacustomer.country = this.customerdata.country
        datacustomer.email = this.customerdata.email
        datacustomer.phoneNumber = this.customerdata.phoneNumber
        datacustomer.mobileNumber = this.customerdata.mobileNumber
        await CustomerService.updateCustomerProfile(datacustomer).then(res => {
          const data = res.data
          if (!data.iook) {
            this.actionMode = this.ACTION_UPDATE_MODE
            throw new Error(data.error)
          }
          this.actionMode = this.ACTION_EDIT_MODE
          this.customerdata = data.data
          this.dateCreated = this.customerdata.dateCreated
          this.dateUpdated = this.customerdata.dateUpdated
          this.snackbarContext = 'success'
          this.snackbarTimeout = 3000
          this.snackbarText = 'perfil actualizado com sucesso!'
          setTimeout(() => {
            this.snackbar = true
          }, 100)
          return res
        }).catch((err) => {
          if (!err.response.data.iook) {
            this.actionMode = this.ACTION_UPDATE_MODE
            this.error = err.response.data.error
          }
          return err
        })
      } else {
        this.actionMode = this.ACTION_UPDATE_MODE
      }
    },
    async fetchCustomerProfile () {
      this.error = ''
      await CustomerService.fetchCustomerProfile().then(responses => {
        if (responses) {
          const theCustomer = responses.data
          if (!theCustomer.iook) {
            this.actionMode = this.ACTION_UPDATE_MODE
            throw new Error(this.theCustomer.error)
          }
          this.customerdata.firstName = theCustomer.data.firstName
          this.customerdata.lastName = theCustomer.data.lastName
          this.customerdata.gender = theCustomer.data.gender
          this.customerdata.birthDate = theCustomer.data.birthDate
          this.customerdata.nid = theCustomer.data.nid
          this.customerdata.nif = theCustomer.data.nif
          this.customerdata.nib = theCustomer.data.nib
          this.customerdata.street = theCustomer.data.street
          this.customerdata.zipcode = theCustomer.data.zipcode
          this.customerdata.city = theCustomer.data.city
          this.customerdata.country = theCustomer.data.country
          this.customerdata.email = theCustomer.data.email
          this.customerdata.phoneNumber = theCustomer.data.phoneNumber
          this.customerdata.mobileNumber = theCustomer.data.mobileNumber
          this.dateCreated = theCustomer.data.dateCreated
          this.dateUpdated = theCustomer.data.dateUpdated
          return theCustomer
        }
        return null
      }).catch(err => {
        if (err) {
          if (!err.response.data.iook) {
            this.actionMode = this.ACTION_UPDATE_MODE
            this.error = err.response.data.error
          }
        }
        return err
      })
    }
  }
}
</script>

<style scoped>
</style>
