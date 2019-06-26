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
              </template>
            </v-checkbox>

            <div v-if="item.isScheduled">
              <span class="caption" v-if="item.startAt">{{ item.startAt }}</span>
              <span class="caption" v-if="item.finishAt">&nbsp;~ {{ item.finishAt }}</span>
            </div>

            <v-icon class="mx-3" @click.stop="onEdit(item)">edit</v-icon>
            <v-dialog v-model="dialog" persistent max-width="800px">
<!--              <template v-slot:activator="{ on }">-->
<!--                <v-icon class="mx-3" v-on="on">edit</v-icon>-->
<!--              </template>-->

              <v-card>
                <v-card-title>
                  <span class="headline">할 일 수정</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-textarea auto-grow v-model="editItem.text" label="내용" rows="2"></v-textarea>
                      </v-flex>

                      <v-flex xs12>
                        <v-checkbox v-model="editItem.isScheduled" label="시작 및 종료 날짜 지정하기"></v-checkbox>
                      </v-flex>

                      <v-flex xs6 v-if="editItem.isScheduled">
                        <v-menu
                          v-model="startDatePicker"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px">
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editItem.startAt"
                              label="시작 날짜"
                              prepend-icon="event"
                              suffix="부터"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker no-title v-model="editItem.startAt" @input="startDatePicker = false"></v-date-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex xs6 v-if="editItem.isScheduled">
                        <v-menu
                          v-model="finishDatePicker"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px">
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editItem.finishAt"
                              label="종료 날짜"
                              prepend-icon="event"
                              suffix="까지"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker no-title v-model="editItem.finishAt" @input="finishDatePicker = false"></v-date-picker>
                        </v-menu>
                      </v-flex>

                    </v-layout>
                  </v-container>

                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat @click="onCancel">취소</v-btn>
                  <v-btn flat @click="onUpdate(editItem)">저장</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
        dialog: false,
        startDatePicker: false,
        finishDatePicker: false,
        text: '',
        editItem: {},
      };
    },
    methods: {
      ...mapActions([ 'insertTodo', 'deleteTodo', 'updateTodo' ]),
      onInsert () {
        if (!this.text) return false;
        const todo = {
          time: new Date().getTime() - new Date().getTimezoneOffset() * 60000,
          isScheduled: false,
          startAt: '',
          finishAt: '',
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
      onEdit (item) {
        this.editItem = JSON.parse(JSON.stringify(item)); // copy without ref
        this.dialog = true;
      },
      onCancel () {
        if (confirm('수정을 취소하고 이전 상태로 돌아갑니다.')) this.dialog = false;
      },
      onUpdate (item) {
        this.updateTodo(item);
        this.dialog = false;
      }
    }
  }
</script>
