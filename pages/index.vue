<template>
  <div class="container mx-auto">
    <p class="font-bold text-3xl my-4">Sunday School Attendance</p>
    <p>{{ message }}</p>
    <p v-show="time">Sorry, Sunday school is not in session</p>

    <div class="my-1" v-show="showForm">
      <input
      type="text" 
      v-model="firstname"
      placeholder="Firstname"
      name="firstname"
      class="px-1 border border-solid rounded-sm border-black">

    <div class="my-1">
    
    <input
      type="text"
      placeholder="Lastname"
      name="lastname"
      v-model="lastname" 
      class="px-1 border border-solid rounded-sm border-black"
    >
    </div>
    
    <button 
      @click="submit"
      class="border-2 px-3 py-1 rounded-md"
    >Present</button>
    <div class="mt-5">
      <div class="" v-for="(item, i) in suggestions" :key="i" @click="present(item)">
      {{ item.firstname }} {{ item.lastname }}
    </div>
    </div>
    </div>
    
  </div>
</template>

<script setup>
  import { useStudentsStore } from '~~/stores/students'
  const showForm = ref(false)
  const time = ref(false)
  const message = ref('')
  const firstname = ref('')
  const lastname = ref('')
  const position = reactive({lat: '', long: ''})
  let postcodes = ref([])
  const postcode = 'SR4 6RQ'
  const suggestions = ref([])

  const member = useStudentsStore()


  onMounted(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(getPosition)
    }
  })

  /**
   * Attendance can only be taken on Sundays, between 10am - 10:40am
   */
  const checkTime = () => {
    const d = new Date();
    if (d.getDay() == 0 && d.getHours() == 9 && d.getMinutes() < 40) { //sunday
      showForm.value = true
      time.value = true
    } else {
      showForm.value = true
    }
    
    let t = d.getTime()
    time.value = t
  }

  const  getPosition = async  (cords) => {
    
    position.lat = cords.coords.latitude
    position.long = cords.coords.longitude
    
    const { data: posts} =  await useFetch(`https://api.postcodes.io/postcodes?lon=${cords.coords.longitude}&lat=${cords.coords.latitude}`)
    
    //find the postcode in the list
    const found = posts.value.result.find((post, i) => post.postcode == postcode)
    if (found) {
      message.value = member.$state.messages.good
      //showForm.value = true
      checkTime()
    } else {
      message.value = member.$state.messages.bad
    }
  } 

  const  submit = ()=> {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(getPosition)
    }
    //add name and then take attendance
    member.addStudent({firstname: firstname.value, lastname: lastname.value})
  }

  const present = (value) => {
  console.log("🚀 ~ file: index.vue:103 ~ present ~ value:", value)
    //make sure the user has not already registered
    member.takeAttendance(value)

  }

  /**
   * Watch name entry
   */

   watch(firstname, () => {
    //console.log("🚀 ~ file: index.vue:101 ~ watch ~ firstname:", firstname.value)
    //console.log("🚀 ~ file: index.vue:101 ~ watch ~ firstname:", member.$state.list[0].firstname)
    
    let found = member.$state.list.filter(name => name.firstname.startsWith(firstname.value))
    suggestions.value = found
    
   })
</script>

<style lang="scss" scoped>

</style>