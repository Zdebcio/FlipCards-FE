<script lang="ts" setup></script>

<template>
  <v-list>
    <v-infinite-scroll mode="manual">
      <v-list-item class="py-2">
        <v-list-item-title>asdasd</v-list-item-title>
        <v-list-item-subtitle class="font-italic">asdasd</v-list-item-subtitle>
        <template v-slot:prepend>
          <v-btn-icon color="transparent" size="small" flat>
            <v-icon class="text-h5">mdi-pencil</v-icon>
          </v-btn-icon>
        </template>
        <template v-slot:append>
          <v-btn-icon color="transparent" size="small" flat>
            <v-icon class="text-h5" color="error">mdi-delete</v-icon>
          </v-btn-icon>
        </template>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>asdasd</v-list-item-title>
        <v-list-item-subtitle class="font-italic">asdasd</v-list-item-subtitle>
        <template v-slot:prepend>
          <v-btn-icon color="transparent" size="small" flat>
            <v-icon class="text-h5">mdi-pencil</v-icon>
          </v-btn-icon>
        </template>
        <template v-slot:append>
          <v-btn-icon color="transparent" size="small" flat>
            <v-icon class="text-h5" color="error">mdi-delete</v-icon>
          </v-btn-icon>
        </template>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>asdasd</v-list-item-title>
        <v-list-item-subtitle class="font-italic">asdasd</v-list-item-subtitle>
        <template v-slot:prepend>
          <v-btn-icon color="transparent" size="small" flat>
            <v-icon class="text-h5">mdi-pencil</v-icon>
          </v-btn-icon>
        </template>
        <template v-slot:append>
          <v-btn-icon color="transparent" size="small" flat>
            <v-icon class="text-h5" color="error">mdi-delete</v-icon>
          </v-btn-icon>
        </template>
      </v-list-item>
    </v-infinite-scroll>
  </v-list>
</template>

<style lang="scss" scoped>
.v-list {
  background-color: transparent;
  padding-top: 0;
}

.v-list-item:deep() {
  grid-template-areas: 'content prepend append';
  grid-template-columns: auto max-content max-content;
  border-bottom: 0.1rem solid rgb(var(--v-theme-background-darken-1));

  & .v-list-item-title {
    font-size: 1.17rem;
  }

  & .v-list-item__prepend {
    width: auto;
    flex-direction: row-reverse;
    & .v-list-item__spacer {
      width: 1rem;
    }
  }
  & .v-list-item__append {
    width: auto;
    & .v-list-item__spacer {
      width: 0.5rem;
    }
  }
}
</style>
