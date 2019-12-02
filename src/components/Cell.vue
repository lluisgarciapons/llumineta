<template>
  <v-flex xs5 md3 lg2 ma-1>
    <v-lazy
      v-model="isActive"
      :options="{
        threshold: 0.5
      }"
      min-height="200"
      transition="fade-transition"
    >
      <v-card
        :color="cell.full ? 'green' : 'rgb(217, 239, 198)'"
        class="mx-auto"
        max-width="344"
        outlined
        :dark="cell.full"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{ cell.name }}</div>
            <v-list-item-title class="headline mb-1">
              {{ cell.number }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ cell.tel }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ cell.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-row justify="center">
            <v-dialog
              v-if="!cell.full"
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on }">
                <v-btn icon large color="green" v-on="on">
                  <v-icon>mdi-playlist-edit</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-form
                  v-model="isFormValid"
                  lazy-validation
                  ref="form"
                  @submit.prevent="updateUser"
                >
                  <v-card-title>
                    <span class="headline">Nou Participant</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Nom complert*"
                            v-model="name"
                            :rules="nameRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail*"
                            required
                          ></v-text-field>
                          <v-text-field
                            type="number"
                            v-model="tel"
                            label="telefon*"
                            :rules="telRules"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*Obligatori</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="reset(), (dialog = false)"
                      >Tancar</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      type="submit"
                      :disabled="
                        !isFormValid || !this.name || !this.email || !this.tel
                      "
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-lazy>
  </v-flex>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    cell: Object
  },
  data() {
    return {
      isFormValid: false,
      isActive: false,
      dialog: false,
      name: "",
      email: "",
      tel: "",
      nameRules: [name => !!name || "El nom és obligatori."],
      emailRules: [
        email => !!email || "l'email és obligatori",
        email => /.@+./.test(email) || "Email must be valid"
      ],
      telRules: [
        tel => !!tel || "el telefon és obligatori",
        tel => tel.length >= 9 || "Numero de telefon valid"
      ]
    };
  },
  methods: {
    reset() {
      this.name = "";
      this.email = "";
      this.tel = "";
    },
    updateUser() {
      if (confirm("Guardar nou participant?")) {
        firebase
          .database()
          .ref("cells/" + this.cell.id)
          .set({
            name: this.name,
            email: this.email,
            tel: this.tel,
            number: this.cell.number,
            full: true
          });
        this.dialog = false;
      }
    }
  }
};
</script>

<style></style>
