<template>
  <v-app>  
    <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex >  
    <section class="hidden-xs-only">
      <div class="layout my-5 column wrap align-center">
        <div class="flex my-3 xs12 sm4">
          <div class="text-xs-center">
            <h2 class="headline">Super Admin</h2>
            <span class="subheading"></span></div>
        </div>
        <div class="flex xs12">
          <div class="container grid-list-xl">
            <div class="layout row wrap align-center">
              <div class="flex xs12 md4">
                <div class="card elevation-0 transparent" style="height: auto;">
                  <div class="card__text text-xs-center"><i class="material-icons icon blue--text text--lighten-2 icon--x-large">color_lens</i></div>
                  <div class="card__title layout justify-center card__title--primary">
                    <div class="headline text-xs-center">Missão</div>
                  </div>
                  <div class="card__text">
                    Temos como Missão Agilizar e Potênciar o seu Negócio para alem do seu escritório, sempre com acompanhamento técnico permanente e com uma a mentalidade competitiva para obter resultados efectivamente rentáveis.
                  </div>
                </div>
              </div>
              <div class="flex xs12 md4">
                <div class="card elevation-0 transparent" style="height: auto;">
                  <div class="card__text text-xs-center"><i class="material-icons icon blue--text text--lighten-2 icon--x-large">flash_on</i></div>
                  <div class="card__title layout justify-center card__title--primary">
                    <div class="headline">Solução</div>
                  </div>
                  <div class="card__text">
                    Todas as Soluções que disponibilizamos são pensadas de uma forma estratégica, seguindo as melhores práticas. Para alem de desenvolvermos novas soluções, oferecemos soluções nas seguintes áreas: Desenvolvimento e Reformulação de Websites, Lojas Online
                    E-Commerce, Planos de Marketing online e entre outros.
                  </div>
                </div>
              </div>
              <div class="flex xs12 md4">
                <div class="card elevation-0 transparent" style="height: auto;">
                  <div class="card__text text-xs-center"><i class="material-icons icon blue--text text--lighten-2 icon--x-large">build</i></div>
                  <div class="card__title layout justify-center card__title--primary">
                    <div class="headline text-xs-center">Serviços IT</div>
                  </div>
                  <div class="card__text">
                    Os nossos Serviços abrangem vaŕios sectores, incluíndo Bens de grande consumo, Business-to-Business, Restauração, Cuidados de Saúde, Retalho, Setor Automóvel, Tecnologia, Viagens, etc...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>     
    </section>
    <section>
    <v-carousel class="mb-5" >
      <v-carousel-item v-for="(item,i) in items" v-bind:key="i" v-bind:src="item.src" transition="fade" reverseTransition="fade" ></v-carousel-item>
     </v-carousel>
    </section>
       </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'getstarted',
  data () {
    return {
      toolbarAbs: true,
      items: [
        {
          src: '/static/doc-images/threeone.png'
        },
        {
          src: '/static/doc-images/oneflex.png'
        },
        {
          src: '/static/doc-images/twoflex.png'
        }
      ]
    }
  }
}
</script>

<style>

</style>
