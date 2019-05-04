<template>
  <v-container
    id="input-usage"
    grid-list-xl
    fluid
  >

    <v-layout wrap>
      <v-flex xs12>

        <v-text-field clearable solo placeholder="할 일 입력" @keypress.enter="insertTodo" v-model="text"></v-text-field>

        <v-list v-if="todos.length">
          <v-list-tile v-for="item in todos" :key="item">
            <v-checkbox
              v-model="done"
              :label="item"
              :value="item"
            ></v-checkbox>
            <v-icon @click="deleteTodo(item)">delete</v-icon>
          </v-list-tile>
        </v-list>

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    // components: {HelloWorld}
    data () {
      return {
        text: '',
        todos: [],
        done: [], // TODO: 상태 이렇게 관리하지 말고... 아이템별로
        enabled: true
      };
    },
    methods: {
      insertTodo () {
        if (!this.text) return false;
        const idx = this.todos.indexOf(this.text);
        if (idx > -1) {
          alert('중복되는 항목입니다.');
          return false;
        }
        this.todos.push(this.text);
        this.text = '';
      },
      deleteTodo (item) {
        const idx = this.todos.indexOf(item);
        const doneIdx = this.done.indexOf(item);
        if (idx > -1) {
          this.todos.splice(idx, 1);
          this.done.splice(doneIdx, 1);
        }
      }
    }
  }
</script>
