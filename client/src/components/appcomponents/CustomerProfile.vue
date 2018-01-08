<template>
<div style="position: relative; overflow: hidden;">
    <v-toolbar      
      color="teal lighten-3"
      scroll-off-screen
      scroll-target="#scrolling-techniques"    
      card  
    >      
      <v-toolbar-title>
  <v-avatar slot="activator">
    <v-icon >person</v-icon>
  </v-avatar>A Minha Conta</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="success" @click="updateCustomer">
        <span v-if="actionMode===ACTION_EDIT_MODE">{{LABEL_EDIT}}</span>
        <span v-if="actionMode===ACTION_UPDATE_MODE">{{LABEL_UPDATE}}</span>
      </v-btn>
    </v-toolbar>
    <div
      style="max-height: 600px;"
      class="scroll-y"
      id="scrolling-techniques"
    >
      <v-container style="height: 1000px;" fluid grid-list-xl>
         <v-layout row wrap v-if="this.error">
           <v-flex>
             <v-alert error value="true"  >
            {{this.error}}
          </v-alert>  
           </v-flex></v-layout>
         
         <v-layout row wrap>
           
  <v-flex>
 <v-card color="grey lighten-4" flat>
   
    <v-card-text>
      <v-container fluid grid-list-xl>
        <v-layout row wrap>
          <v-flex md4 lg4>
            <v-text-field
              name="firstName"
              label="Nome"
              :disabled="actionMode===ACTION_EDIT_MODE"
            ></v-text-field>
          </v-flex>
          <v-flex md4 lg4>
            <v-text-field
              name="lastName"
              label="Apelido"
              :disabled="actionMode===ACTION_EDIT_MODE"
            ></v-text-field>
          </v-flex>      
        </v-layout>
         <v-layout row wrap>
           <v-flex md4 lg4>
          <v-select
              v-bind:items="items"
              v-model="e1"
              label="Genero"
              single-line
              bottom
              :disabled="actionMode===ACTION_EDIT_MODE"
            ></v-select>
           </v-flex>
               <v-flex md4 lg4>
      <v-dialog        
        v-model="modalBirthDate"
        lazy
        full-width
        width="290px"
        :disabled="actionMode===ACTION_EDIT_MODE"
      >
        <v-text-field
          slot="activator"
          label="Birth Date"
          v-model="birthDate"
          prepend-icon="event"
          readonly
          :disabled="actionMode===ACTION_EDIT_MODE"
        ></v-text-field>
        <v-date-picker v-model="birthDate" scrollable actions>
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
            <v-text-field
              name="nid"
              label="Número Identidade"
              :disabled="actionMode===ACTION_EDIT_MODE"
            ></v-text-field>
          </v-flex>
          <v-flex md4 lg4>
            <v-text-field
              name="nif"
              label="Número Fiscal"
              :disabled="actionMode===ACTION_EDIT_MODE"
            ></v-text-field>
          </v-flex>
         
        </v-layout>
 <v-layout row wrap>
   <v-flex md5 lg5>
            <v-text-field
              name="nib"
              label="Número Bancário"
              :disabled="actionMode===ACTION_EDIT_MODE"
            ></v-text-field>
          </v-flex>
   </v-layout>       

<v-layout row wrap>
  
  <v-flex md5 lg5>
    <v-text-field
      name="street"
      label="Morada"
      :disabled="actionMode===ACTION_EDIT_MODE"
    ></v-text-field>
  </v-flex>
  <v-flex md3 lg3>
    <v-text-field
      name="zipcode"
      label="Código Postal"
      :disabled="actionMode===ACTION_EDIT_MODE"
    ></v-text-field>
  </v-flex>
   
</v-layout>
<v-layout row wrap>
  <v-flex md3 lg3>
    <v-text-field
      name="city"
      label="Cidade"
      :disabled="actionMode===ACTION_EDIT_MODE"
    ></v-text-field>
    
    </v-flex>
    <v-flex md3 lg3>
    <v-text-field
      name="country"
      label="País"
      :disabled="actionMode===ACTION_EDIT_MODE"
    ></v-text-field>
  </v-flex>
</v-layout>
<v-layout row wrap>
  <v-flex md3 lg3>
    <v-text-field
      name="email"
      label="Email"
      :disabled="actionMode===ACTION_EDIT_MODE"
    ></v-text-field>
  </v-flex>
</v-layout>
<v-layout row wrap>
  <v-flex md3 lg3>
    <v-text-field
      name="phoneNumber"
      label="Telefone"
      :disabled="actionMode===ACTION_EDIT_MODE"
    ></v-text-field>
  </v-flex>
    <v-flex md3 lg3>
    <v-text-field
      name="mobileNumber"
      label="Telemovel"
      :disabled="actionMode===ACTION_EDIT_MODE"
    ></v-text-field>
    </v-flex>
</v-layout>

      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" @click="updateCustomer">
        <span v-if="actionMode===ACTION_EDIT_MODE">{{LABEL_EDIT}}</span>
        <span v-if="actionMode===ACTION_UPDATE_MODE">{{LABEL_UPDATE}}</span>
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
      e1: null,
      birthDate: null,
      modalBirthDate: false,
      items: [{ text: 'Male' }, { text: 'Female' }],
      actionMode: 0,
      error: ''
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
    LABEL_UPDATE: () => 'UPDATE'
  },
  async created () {
    this.actionMode = this.ACTION_EDIT_MODE
    try {
      const response = await this.fetchCustomerProfile().then((res) => {
        return res
      }).catch((err) => { if (err) { } return err })
      if (response) {
        console.log(response)
      }
    } catch (error) {
      alert('precisa de ser revisto')
      this.error = error
    }
  },
  mounted () {
  },
  methods: {
    cancel () {
      console.log('cancel')
    },
    save () {
      console.log('save')
    },
    updateCustomer (event) {
      debugger
      console.log(this.actionMode)
      this.actionMode = this.actionMode === this.ACTION_EDIT_MODE ? this.ACTION_UPDATE_MODE : this.ACTION_EDIT_MODE
    },
    async fetchCustomerProfile () {
      const resultFC = await CustomerService.fetchCustomerProfile().then((res) => {
        return res
      }).catch((err) => { if (err) { } return err })
      return resultFC
    }
  }
}
</script>

<style scoped>

</style>