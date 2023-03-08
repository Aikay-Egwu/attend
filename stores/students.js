import { defineStore } from 'pinia'
export const useStudentsStore = defineStore('students', {
  state: () => ({
    messages : {
      good: "You are in the right location, thank you for attending sunday school today",
      bad: 'Sorry, I donot think you are in church'
    },
    list: [
      {id:1, firstname: 'James', lastname: 'Moses', class: ''},
      {id:2, firstname: 'John', lastname: 'Joseph', class: ''},
      {id:3, firstname: 'Johnson', lastname: 'Joseph', class: ''},
      {id:4, firstname: 'Jane', lastname: 'Joseph', class: ''},
      {id:5, firstname: 'Jackson', lastname: 'Joseph', class: ''},
      {id:6, firstname: 'Andrew', lastname: 'David', class: ''},
      {id:7, firstname: 'Matthew', lastname: 'Issac', class: ''},
      {id:8, firstname: 'Mark', lastname: 'Issac', class: ''},
      {id:9, firstname: 'Jake', lastname: 'Issac', class: ''},
    ],
    sheet: [
      {id: 1, member_id: 1, date: ''}
    ]
  }),
  getters: {
    msgs: (state) => state.message
  },
  actions: {
    addStudent() {

    },

    takeAttendance(value) {
      this.sheet.push({
        id: 2, member_id: '', date: new Date()
      })
    }
  }
})