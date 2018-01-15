<template>
  <div style="position: relative; overflow: hidden;">
    <v-toolbar color="teal lighten-3" scroll-off-screen scroll-target="#scrolling-techniques" card>
      <v-toolbar-title>
        <v-avatar slot="activator">
          <v-icon>person</v-icon>
        </v-avatar>A Minha Conta</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="success" @click="updateCustomer">
        <span v-if="actionMode===ACTION_EDIT_MODE">{{LABEL_EDIT}}</span>
        <span v-if="actionMode===ACTION_UPDATE_MODE">{{LABEL_UPDATE}}</span>
      </v-btn>
       <v-btn color="success" @click="rollbackCustomer" v-if="actionMode===ACTION_UPDATE_MODE">
        <span >{{LABEL_CANCEL}}</span>
      </v-btn>
    </v-toolbar>
    <div class="scroll-y" id="scrolling-techniques">
      <v-container fluid grid-list-xl>
        
        <v-layout row wrap>
          <v-flex>
            <v-card color="grey lighten-4" flat>
              <v-card-text>
                <v-container fluid grid-list-xl>
                  <v-layout row wrap v-if="this.error">
                    <v-flex>
                      <v-alert error value="true">
                        {{this.error}}
                      </v-alert>
                    </v-flex>
                  </v-layout>
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
                      <v-select v-bind:items="genderItems" v-model="customerdata.gender" item-value="text" label="Genero" single-line bottom :disabled="actionMode===ACTION_EDIT_MODE"></v-select>
                    </v-flex>
                    <v-flex md4 lg4>
                      <v-dialog v-model="modalBirthDate" lazy full-width width="290px" :disabled="actionMode===ACTION_EDIT_MODE" >
                        <v-text-field slot="activator" label="Birth Date" v-model="customerdata.birthDate" prepend-icon="event" readonly :disabled="actionMode===ACTION_EDIT_MODE" :rules="[() => customerdata.birthDate.length > 0 || 'This field is required']"
                      required></v-text-field>
                        <v-date-picker v-model="customerdata.birthDate" scrollable actions>
                          <template scope="{ save, cancel }">
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
                    <v-flex md3 lg3>
                      <v-text-field v-model="customerdata.country" name="country" label="País" :disabled="actionMode===ACTION_EDIT_MODE"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex md3 lg3>
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
              </v-card-text>
              <v-card-actions>
                <v-btn color="success" @click="updateCustomer">
                  <span v-if="actionMode===ACTION_EDIT_MODE">{{LABEL_EDIT}}</span>
                  <span v-if="actionMode===ACTION_UPDATE_MODE">{{LABEL_UPDATE}}</span>
                </v-btn>
                <v-btn color="success" @click="rollbackCustomer" v-if="actionMode===ACTION_UPDATE_MODE">
                  <span >{{LABEL_CANCEL}}</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex>
            <div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import CustomerService from '@/services/CustomerService'
import { mapState } from 'vuex'
const name = 'auth'
export default {
  data () {
    return {
      modalBirthDate: false,
      genderItems: [{ text: 'Male' }, { text: 'Female' }],
      actionMode: 0,
      error: '',
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
      }
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
  mounted () {
  },
  methods: {
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
          debugger
          const data = res.data
          if (!data.iook) {
            this.actionMode = this.ACTION_UPDATE_MODE
            throw new Error(data.error)
          }
          this.actionMode = this.ACTION_EDIT_MODE
          this.customerdata = data.data
          return res
        }).catch((err) => {
          debugger
          if (!err.response.data.iook) {
            this.actionMode = this.ACTION_UPDATE_MODE
            this.error = err.response.data.error
          }
          return err
        })
      } else {
        debugger
        this.actionMode = this.ACTION_UPDATE_MODE
      }
    },
    async fetchCustomerProfile () {
      this.error = ''
      await CustomerService.fetchCustomerProfile().then(responses => {
        debugger
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
          return theCustomer
        }
        return null
      }).catch(err => {
        if (err) {
          debugger
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