<v-toolbar
      absolute
      color="teal lighten-3"
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      v-bind="binding"
    >
      <v-toolbar-title>
        
              <v-avatar slot="activator">
              <v-icon >people</v-icon>
              </v-avatar>
              A Minha Conta

      </v-toolbar-title>
      <v-spacer></v-spacer>
     <v-btn flat color="success" @click="updateCustomer">update</v-btn>
    </v-toolbar>
    <div
      style="max-height: 600px;"
      class="scroll-y"
      id="scrolling-techniques"
    >
      <v-container style="height: 1000px;" grid-list-xl>
    <v-layout row wrap>
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
      <v-btn color="success" @click="updateCustomer">update</v-btn>
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