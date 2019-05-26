<template>
  <v-container id="input-usage" grid-list-xl fluid>

    <v-layout wrap>
      <v-flex xs12>

        <v-text-field clearable
                      solo
                      hint="입력 후 엔터"
                      :rules="[v => !!v || '할 일을 입력하세요.']"
                      placeholder="할 일 입력"
                      @keypress.enter="onInsert"
                      v-model="text">
        </v-text-field>

        <v-list v-if="todoList.length">
          <v-list-tile v-for="item in todoList" :key="item.time">
            <v-checkbox v-model="item.isDone" @change="onStateChange(item)">
              <template v-slot:label>
                <span class="mr-3">{{ item.text }}</span>
                <!-- TODO: timezone offset 처리 -->
                <span class="caption">{{ new Date(item.time).toISOString().substr(0, 10) }} {{ new Date(item.time).toISOString().substr(11, 8) }}</span>
              </template>
            </v-checkbox>
            <v-icon class="mr-3" @click="onUpdate(item)">edit</v-icon>
            <v-icon @click="onDelete(item)">delete</v-icon>
          </v-list-tile>
        </v-list>

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters([ 'uid', 'todoList' ])
    },
    data () {
      return {
        text: '',
      };
    },
    methods: {
      ...mapActions([ 'insertTodo', 'deleteTodo', 'updateTodo' ]),
      onInsert () {
        if (!this.text) return false;
        const todo = {
          time: new Date().getTime(),
          text: this.text,
          isDone: false,
        };
        this.insertTodo(todo);
        this.text = '';
      },
      onDelete (item) {
        if (confirm('삭제하시겠습니까?')) this.deleteTodo(item);
      },
      onStateChange (item) {
        this.updateTodo(item);
      },
      onUpdate (item) {
        alert('TODO: 수정');
        // this.updateTodo(item);
      }
    }
  }
</script>
