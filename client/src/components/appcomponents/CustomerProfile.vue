<template>
<div>
   <v-container grid-list-xl>
    <v-layout v-bind="binding" row wrap>
       <v-flex>
         <div>
            <h3 class="headline mb-0">
              <v-avatar slot="activator">
              <v-icon color="red">people</v-icon>
              </v-avatar>
              A Minha Conta</h3>
           
          </div>
       </v-flex>
      <v-flex>
 <v-card color="grey lighten-4" flat>
   
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex md3 lg3>
            <v-text-field
              name="firstName"
              label="Nome"
            ></v-text-field>
          </v-flex>
          <v-flex md3 lg3>
            <v-text-field
              name="lastName"
              label="Apelido"
            ></v-text-field>
          </v-flex>      
        </v-layout>
         <v-layout row wrap>
           <v-flex md3 lg3>
          <v-select
              v-bind:items="items"
              v-model="e1"
              label="Genero"
              single-line
              bottom
            ></v-select>
           </v-flex>
               <v-flex md3 lg3>
      <v-dialog        
        v-model="modalBirthDate"
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          label="Birth Date"
          v-model="birthDate"
          prepend-icon="event"
          readonly
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
          <v-flex md3 lg3>
            <v-text-field
              name="nid"
              label="Número Identidade"
            ></v-text-field>
          </v-flex>
          <v-flex md3 lg3>
            <v-text-field
              name="nif"
              label="Número Fiscal"
            ></v-text-field>
          </v-flex>
         
        </v-layout>
 <v-layout row wrap>
   <v-flex md4 lg4>
            <v-text-field
              name="nib"
              label="Número Bancário"
            ></v-text-field>
          </v-flex>
   </v-layout>       

<v-layout row wrap>
  
  <v-flex md4 lg4>
    <v-text-field
      name="street"
      label="Morada"
    ></v-text-field>
  </v-flex>
  <v-flex md2 lg2>
    <v-text-field
      name="zipcode"
      label="Código Postal"
    ></v-text-field>
  </v-flex>
   
</v-layout>
<v-layout row wrap>
  <v-flex md2 lg2>
    <v-text-field
      name="city"
      label="Cidade"
    ></v-text-field>
    
    </v-flex>
    <v-flex md2 lg2>
    <v-text-field
      name="country"
      label="País"
    ></v-text-field>
  </v-flex>
</v-layout>
<v-layout row wrap>
  <v-flex md2 lg2>
    <v-text-field
      name="email"
      label="Email"
    ></v-text-field>
  </v-flex>
</v-layout>
<v-layout row wrap>
  <v-flex md2 lg2>
    <v-text-field
      name="phoneNumber"
      label="Telefone"
    ></v-text-field>
  </v-flex>
    <v-flex md2 lg2>
    <v-text-field
      name="mobileNumber"
      label="Telemovel"
    ></v-text-field>
    </v-flex>
</v-layout>

      </v-container>
    </v-card-text>
    <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
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
</template>

<script>
import { mapState } from 'vuex'
const name = 'auth'
export default {
  data () {
    return {
      e1: null,
      birthDate: null,
      modalBirthDate: false,
      items: [{ text: 'Male' }, { text: 'Female' }]
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
    }
  },
  created () {},
  methods: {
    cancel () {
      console.log('cancel')
    },
    save () {
      console.log('save')
    }
  }
}
</script>

<style scoped>

</style>