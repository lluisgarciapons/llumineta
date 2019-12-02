<template>
  <v-container>
    <!-- <v-btn @click="postLluminetes">CREATE</v-btn> -->
    <v-text-field
      v-model="number"
      type="number"
      placeholder="Buscar per numero"
    />
    <v-layout v-if="!number" text-center justify-center wrap>
      <v-flex v-if="getFilters == 'all'">
        Total: {{ getCellByFull.length }}
      </v-flex>
      <v-flex v-else-if="getFilters">
        Ocupats: {{ getCellByFull.length }}
      </v-flex>
      <v-flex v-else> Lliures: {{ getCellByFull.length }} </v-flex>
    </v-layout>
    <v-layout text-center justify-center wrap>
      <Cell
        v-for="(cell, id, index) in getCellByFull"
        :cell="cell"
        :key="index"
      />
      <v-flex v-if="getCellByFull.length == 0">
        <v-alert type="warning">
          No hi ha cap llumineta que coincidexi amb els filtres escollits.
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Cell from "../components/Cell";
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "Llumineta",
  components: {
    Cell
  },

  data: () => ({
    cells: {},
    number: "",
    items: [
      { text: "TOTS", value: "all" },
      { text: "LLIURES", value: false },
      { text: "OCUPATS", value: true }
    ]
  }),
  methods: {
    async postLluminetes() {
      for (let i = 1; i <= 368; i++) {
        // Get a key for a new Post.
        var newPostKey = await firebase
          .database()
          .ref()
          .child("cells")
          .push().key;

        var postData = {
          name: "LLIURE",
          tel: "tel: - - ",
          email: "email: - - ",
          number: i,
          id: newPostKey,
          full: false
        };

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates["/cells/" + newPostKey] = postData;

        await firebase
          .database()
          .ref()
          .update(updates);
      }
    },
    getLluminetes() {
      var lluminetes = firebase.database().ref("cells");
      lluminetes.on("value", snapshot => {
        this.cells = snapshot.val();
      });
    }
  },
  computed: {
    ...mapGetters(["getFilters"]),
    getCellByFull() {
      return Object.values(this.cells)
        .filter(cell => {
          if (this.getFilters == "all") {
            return true;
          }
          return cell.full == this.getFilters;
        })
        .filter(filteredCell => {
          if (this.number == "") return true;
          return filteredCell.number == this.number;
        });
    }
  },
  created() {
    this.getLluminetes();
  }
};
</script>
